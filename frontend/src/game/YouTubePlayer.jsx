// ============================================
// src/game/YouTubePlayer.jsx
// YouTube player with end detection
// Button only unlocks when video finishes
// ============================================

import { useEffect, useRef, useState } from 'react';

const YouTubePlayer = ({ videoId, onVideoEnd }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [watchedPercent, setWatchedPercent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }

    const initPlayer = () => {
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          disablekb: 1,       // disable keyboard shortcuts
          fs: 0,              // disable fullscreen
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: () => setPlayerReady(true),
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED) {
              setVideoEnded(true);
              setWatchedPercent(100);
              clearInterval(intervalRef.current);
            }

            if (e.data === window.YT.PlayerState.PLAYING) {
              intervalRef.current = setInterval(() => {
                if (playerRef.current) {
                  const duration = playerRef.current.getDuration();
                  const current = playerRef.current.getCurrentTime();
                  if (duration > 0) {
                    const percent = Math.round((current / duration) * 100);

                    // Detect skip — if jumped more than 5 seconds ahead
                    const prevTime = playerRef.current._lastTime || 0;
                    if (current - prevTime > 5 && prevTime > 0) {
                      // Force back to last valid position
                      playerRef.current.seekTo(prevTime, true);
                      playerRef.current.playVideo();
                    } else {
                      playerRef.current._lastTime = current;
                      setWatchedPercent(percent);
                    }
                  }
                }
              }, 1000);
            }

            if (e.data === window.YT.PlayerState.PAUSED) {
              clearInterval(intervalRef.current);
              // Store time when paused to detect skip after resume
              if (playerRef.current) {
                playerRef.current._lastTime = playerRef.current.getCurrentTime();
              }
            }
          },
        },
      });
    };

    // Wait for API to be ready
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      clearInterval(intervalRef.current);
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch (e) { }
      }
    };
  }, [videoId]);

  return (
    <div style={styles.wrap}>
      {/* YouTube player container */}
      <div style={styles.playerBox}>
        <div ref={containerRef} style={styles.player} />
        {!playerReady && (
          <div style={styles.loading}>Loading video... 🎬</div>
        )}
      </div>

      {/* Progress bar */}
      <div style={styles.progressWrap}>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${watchedPercent}%` }} />
        </div>
        <span style={styles.progressText}>{watchedPercent}% watched</span>
      </div>

      {/* Status message */}
      {!videoEnded && (
        <div style={styles.warningBox}>
          ⚠️ You must watch the full video before continuing. Do not skip!
        </div>
      )}

      {/* Continue button — only shows when video ends */}
      {videoEnded ? (
        <button style={styles.continueBtn} onClick={onVideoEnd}>
          ✅ Video Complete! Continue →
        </button>
      ) : (
        <button style={styles.lockedBtn} disabled>
          🔒 Finish watching to continue...
        </button>
      )}
    </div>
  );
};

const styles = {
  wrap: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  playerBox: { position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '10px', overflow: 'hidden' },
  player: { width: '100%', height: '100%' },
  loading: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1rem', background: '#000' },
  progressWrap: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  progressBar: { flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, #2563eb, #16a34a)', borderRadius: '4px', transition: 'width 0.5s ease' },
  progressText: { fontSize: '0.8rem', color: '#64748b', whiteSpace: 'nowrap', fontWeight: '600' },
  warningBox: { background: '#fff7ed', border: '1px solid #fed7aa', color: '#c2410c', padding: '0.65rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '500' },
  continueBtn: { width: '100%', padding: '0.85rem', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer' },
  lockedBtn: { width: '100%', padding: '0.85rem', background: '#e2e8f0', color: '#94a3b8', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', cursor: 'not-allowed' },
};

export default YouTubePlayer;
