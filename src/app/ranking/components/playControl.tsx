import { usePlaylist } from '@/hooks/usePlaylist';
import { PlayArrowRounded, PlaylistAdd } from '@mui/icons-material';

interface PlaybackControlProps {
  videos: any[];
  selectedMusic: Set<string>;
}

const PlaybackControl = ({ videos, selectedMusic }: PlaybackControlProps) => {
  const { handlePlayAll, handlePlaySelected } = usePlaylist();
  const hasSelectedMusic = selectedMusic.size > 0;

  const handlePlay = async (type: 'selected' | 'all') => {
    try {
      if (type === 'selected') {
        handlePlaySelected(selectedMusic);
      } else {
        handlePlayAll(videos);
      }
    } catch (error) {
      console.error('Failed to play music:', error);
    }
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 mx-auto max-w-lg lg:max-w-5xl bg-white shadow-lg border-t border-gray-100">
      <div className="flex justify-between items-center">
        {hasSelectedMusic ? (
          <>
            <button
              onClick={() => handlePlay('selected')}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 
                      bg-brand-primary text-white 
                      hover:bg-brand-primary/90 active:bg-brand-primary/80 
                      transition-colors duration-200"
            >
              <PlayArrowRounded className="w-5 h-5" />
              <span className="font-medium">선택곡 재생 ({selectedMusic.size}곡)</span>
            </button>
            <button
              onClick={() => handlePlay('all')}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 
                      bg-gray-50 text-gray-700
                      hover:bg-gray-100 active:bg-gray-200
                      transition-colors duration-200"
            >
              <PlaylistAdd className="w-5 h-5" />
              <span className="font-medium">Top30 재생</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => handlePlay('all')}
            className="w-full flex items-center justify-center gap-2 py-3.5 
                      bg-brand-primary text-white
                      hover:bg-brand-primary/90 active:bg-brand-primary/80
                      transition-colors duration-200"
          >
            <PlayArrowRounded className="w-5 h-5" />
            <span className="font-medium">Top30 재생</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaybackControl;
