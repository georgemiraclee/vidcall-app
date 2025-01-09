import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Element } from './type';
import { getUrlParams, randomID } from './functions';
import { baseUrl } from './const';

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
            name: 'Meeting link',
            url:
              baseUrl +'?roomID=' +roomID,
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
