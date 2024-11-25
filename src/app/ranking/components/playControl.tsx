import { usePlaylist } from '@/hooks/usePlaylist';
import { useYoutubeVideos } from '@/hooks/useYoutubeVideos';
import { PlayArrowRounded, PlaylistAdd } from '@mui/icons-material';

const PlaybackControl = ({ videos, selectedMusic }) => {
  const { handlePlayAll, handlePlaySelected } = usePlaylist();
  const hasSelectedMusic = selectedMusic?.size > 0;

  return (
    <div className="fixed bottom-16 left-0 right-0 max-w-lg mx-auto bg-white ">
      <div className="flex justify-between items-center">
        {hasSelectedMusic ? (
          <>
            <button
              onClick={() => handlePlaySelected(selectedMusic)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-primary/90 text-white hover:bg-brand-primary  transition-colors"
            >
              <PlayArrowRounded />
              <span>선택곡 재생 ({selectedMusic.size}곡)</span>
            </button>
            <button
              onClick={() => handlePlayAll(videos)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <PlaylistAdd />
              <span>전체재생</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => handlePlayAll(videos)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-brand-primary/90 text-white hover:bg-brand-primary transition-colors"
          >
            <PlayArrowRounded />
            <span>전체재생</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaybackControl;