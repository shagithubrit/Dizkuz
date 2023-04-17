import React from 'react';
import MessageCardOther from '../../Components/MessageCardOther';
import MessageCardUser from '../../Components/MessageCardUser';
import './ChatPage.css';
import MessageInput from '../../Components/MessageInput';

const messageList = [
    {
        author : 'Ambani',
        text : 'Hello!',
        dateTime : '7:30 AM 24th April 2022',
        userAuth : false
    },
    {
        author : 'Narendra Modi',
        text : 'Hii',
        dateTime : '7:40 AM 24th April 2022',
        userAuth : false
    },
    {
        author : 'Yogi Jii',
        text : `What's up friends?`,
        dateTime : '7:32 AM 24th April 2022',
        userAuth : false
    },
    {
        author : 'Lalu Yadav',
        text : 'Ab kya hua??',
        dateTime : '7:34 AM 24th April 2022',
        userAuth : true
    },
    {
        author : 'Yogi Jii',
        text : `Lalu bro!! kya lagta h, abki baar jeet payenge aap?? Bihar me aap haar gaye, UP me Akhilesh... Yadavo ka era lagg rha chala gya`,
        dateTime : '7:40 AM 24th April 2022',
        userAuth : false
    },
    {
        author : 'Narendra Modi',
        text : 'Areee Yogi jii, sab mera kamal h',
        dateTime : '7:40 AM 24th April 2022',
        userAuth : false
    },
    {
        author : 'Ambani',
        text : 'Modi zyada kuud mat, abhi saare vidhayako ko khareed ke Lalu ki sarkar khada kar dunga!! Desh ke samne toh bohot bada hero banta, ab idhar bhi hero hi banna h terko??',
        dateTime : '7:42 AM 24th April 2022',
        userAuth : false
    },
    {
        author : 'Lalu Yadav',
        text : `Sasura tum sab ko aisa maar maarenge, naache ke apne sasural jaa giroge... tamasha bana ke rakkh diya h sab... Aaye da election, baans na kar deb tah lalu yadav naa hum... Aditya Singh yadav ke kasam khaa tani!`,
        dateTime : '7:50 AM 24th April 2022',
        userAuth : true
    },
    {
        author : 'Yogi Jii',
        text : 'Wow!! Nice joke Lalu bro!!  Jail me sense of humour increase ho gya h aapka',
        dateTime : '7:52 AM 24th April 2022',
        userAuth : false
    },
    {
        author : 'Lalu Yadav',
        text : 'Nikale da... btayib tarah ke... Aditya Singh Yadav Zindabaad!!',
        dateTime : '7:52 AM 24th April 2022',
        userAuth : true
    },
];

export default function ChatPage() {

    const MessageComponent = messageList.map(( message) =>{
        return(
        message.userAuth ?
        <div>
            <MessageCardOther author={message.author} text={message.text} dateTime={message.dateTime} />
        </div>
        :
        <div>
            <MessageCardUser author={message.author} text={message.text} dateTime={message.dateTime} />
        </div>
        );
      });

      const [ currentUser, setCurrentUser] = useState({
        name : null,
        email : null,
        password : null,
        organisations : [],
        messages : 0
      });
    
      useEffect( () => {
        const currentUser_ = JSON.parse(localStorage.getItem('currentUser'));
        setCurrentUser( currentUser_);
    
        if( currentUser.name == null){
          navigate( '/landing');
        }
    
      }, []);

  return (
    <>
    <div className='ChatPageContainer'>
        <div className='ChatPageContainer2'>
            {MessageComponent}
        </div>
    </div>
    <MessageInput />
    </>
  )
}
