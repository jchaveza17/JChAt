import { getFirestore, collection, addDoc, serverTimestamp, updateDoc, arrayUnion, arrayRemove, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import uploadImage from './uploadImage';

const db = getFirestore();


export async function createChatroom(chatroomName, chatroomImage) {
  let imageUrl = '';
  if (chatroomImage) {
    imageUrl = await uploadImage(chatroomImage);
  }

  const chatroomRef = await addDoc(collection(db, 'Chatrooms'), {
    name: chatroomName,
    imageUrl,
    members: [],
    createdAt: serverTimestamp(),
  });
  return chatroomRef.id;
}


export async function addMessageToChatroom(chatroomId, userId, messageText, avatar, username) {
  if (!userId || !messageText) {
    throw new Error("Invalid userId or messageText");
  }

  const messagesRef = collection(db, 'Chatrooms', chatroomId, 'messages');
  
  await addDoc(messagesRef, {
    userId,
    text: messageText,
    avatar, 
    username,
    timestamp: serverTimestamp(),
  });
}


export function listenToMessages(chatroomId, callback) {
  const messagesRef = collection(db, 'Chatrooms', chatroomId, 'messages');
  const messagesQuery = query(messagesRef, orderBy('timestamp'));

  return onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages);
  });
}
  


export async function joinChatroom(currentUser, chatroomId) {
  const userDocRef = doc(db, 'Users', currentUser.id);
  const chatroomDocRef = doc(db, 'Chatrooms', chatroomId);

  // Check if chatroom exists
  const chatroomSnap = await getDoc(chatroomDocRef);
  if (!chatroomSnap.exists()) {
    throw new Error(`Chatroom with ID ${chatroomId} does not exist.`);
  }

 
  await updateDoc(userDocRef, {
    chats: arrayUnion(chatroomId),
  });

 
  await updateDoc(chatroomDocRef, {
    members: arrayUnion({
      userId: currentUser.id,
      username: currentUser.username,
    }),
  });
}


export async function leaveChatroom(currentUser, chatroomId) {
  const userDocRef = doc(db, 'Users', currentUser.id);
  await updateDoc(userDocRef, {
    chats: arrayRemove(chatroomId),
  });

  const chatroomDocRef = doc(db, 'Chatrooms', chatroomId);
  await updateDoc(chatroomDocRef, {
    members: arrayRemove({
      userId: currentUser.id,
      username: currentUser.username
    }),
  });
}

