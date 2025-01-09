import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Element } from './type';
import { getUrlParams, randomID } from './functions';

export default function App() {
      const roomID = getUrlParams().get('roomID') || randomID(5);
      const myMeeting = async (element: Element) => {
     // generate Kit Token
      const appID = 49825981;
      const serverSecret = "974f780a0e28d5726b3e7c7e75da1e72";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));

    
     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });

    
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
