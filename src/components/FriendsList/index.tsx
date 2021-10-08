/* eslint-disable react/destructuring-assignment */
import { useEffect } from 'react';
import { supabase } from '../../services/supabase';
import styles from './styles.module.scss';

export default function FriendsList(friendData) {
  // const listOFUsers = false;
  // console.log(listOFUsers);
  // const { following } = listOFUsers;

  // preciso pegar o array de dados de quem o user x segue, estou pegando somente de um camarada
  // console.log('friendData');

  const friendsData = [friendData.props];

  // console.log(friendsData);
  return friendsData ? (
    <section className={styles.list}>
      {/* {friendsData.map(friend => (
        <div key={friend.id.slice(0, 3)} className={styles.friendCard}>
          <div className={styles.friendInfo}>
            <img src={friend.photo_url} alt="" />
            <h2>{friend.name}</h2>
          </div>
          <p>{friend.email}</p>
        </div>
      ))} */}
    </section>
  ) : (
    <h3>Você ainda não está seguindo nenhum buddy :/ </h3>
  );
}
