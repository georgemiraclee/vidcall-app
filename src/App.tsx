import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Element } from './type';
import { getUrlParams, randomID } from './functions';
import { baseUrl } from './const';
import './index.css';
import { Share2, Users } from 'lucide-react';
import { useState} from 'react';

export default function App() {
  const [participantCount, setParticipantCount] = useState(0);
  const roomID = getUrlParams().get('roomID') || randomID(5);

  const myMeeting = async (element: Element) => {
    const appID = 49825981;
    const serverSecret = "974f780a0e28d5726b3e7c7e75da1e72";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Meeting link',
          url: baseUrl + '?roomID=' + roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      onUserJoin: (users) => {
        setParticipantCount(users.length);
      },
      onUserLeave: (users) => {
        setParticipantCount(Math.max(0, users.length));
      },
    });
  };

  const copyLink = () => {
    const link = baseUrl + '?roomID=' + roomID;
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <header className="p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-black">
            Video Meeting
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-200 px-3 py-1.5 rounded-lg">
              <Users size={16} className="text-gray-500 mr-2" />
              <span className="text-sm font-sans">{participantCount} Participant{participantCount !== 1 ? 's' : ''}</span>
            </div>
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-3 py-1.5 bg-lime-400 hover:bg-lime-500 rounded-lg transition-colors font-sans"
            >
              <Share2 size={16} />
              <span className="text-sm font-sans">Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
        <div
          className="aspect-video w-full bg-gradient-to-br from-blue-600 to-black rounded-lg"
          ref={myMeeting}
        />

        {/* Room Info */}
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-200 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <p className="text-gray-500 text-xs sm:text-sm font-serif">Room ID</p>
              <p className="font-mono text-base sm:text-lg break-all text-black font-semibold">{roomID}</p>
            </div>
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
              <div className="flex items-center sm:hidden">
                <Users size={16} className="text-gray-500 mr-2" />
                <span className="text-sm font-sans">{participantCount} Participant{participantCount !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
