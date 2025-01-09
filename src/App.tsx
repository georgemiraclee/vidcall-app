import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Element } from './type';
import { getUrlParams, randomID } from './functions';
import { baseUrl } from './const';
import './index.css'  // atau sesuaikan dengan lokasi file CSS Anda
import { Share2 } from 'lucide-react';


export default function App() {
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
    });
  };

  const copyLink = () => {
    const link = baseUrl + '?roomID=' + roomID;
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Video Meeting
          </h1>
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Share2 size={20} />
            <span className="hidden md:inline">Share Link</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div
            className="aspect-video w-full"
            ref={myMeeting}
          />
        </div>

        {/* Room Info */}
        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Room ID</p>
              <p className="font-mono text-lg">{roomID}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Participants</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}