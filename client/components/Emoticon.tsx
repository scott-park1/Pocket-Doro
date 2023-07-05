import React, { useEffect } from 'react'
import { SpriteAnimator } from './sprites/SpriteAnimator'
import { useState } from 'react'

const emoticonSheet = 'assets/CharacterSprites/emoticons.png'

interface Props {
  skippedBreaks: number
  resting: boolean
}

export default function Emoticon({ skippedBreaks, resting }: Props) {
  const [tiredLevel, setTiredLevel] = useState(0)
  const [previousSkippedBreaks, setPreviousSkippedBreaks] = useState(0)

  const spriteWidth = 16
  const spriteHeight = 16
  const [scale, setScale] = useState(0.2)
  const frameCount = 6
  const wrapAfter = 5
  const fps = 0

  // let startEmoticon = 5
  const onBreak = 14
  const study = 3
  const tired = 6 //skip 1 break
  const veryTired = 9 //skip 2 breaks
  const veryVeryTired = 13

  useEffect(() => {
    if (skippedBreaks < previousSkippedBreaks && tiredLevel > 0) {
      setTiredLevel(tiredLevel - 1)
    } else if (skippedBreaks > previousSkippedBreaks && tiredLevel < 3) {
      setTiredLevel(tiredLevel + 1)
    }
    setPreviousSkippedBreaks(skippedBreaks)
  }, [skippedBreaks])

  useEffect(() => {
    const handleResize = () => {
      const newScale = 450 / window.innerWidth // adjust to find best fit
      setScale(newScale)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function emoticonCycle() {
    switch (tiredLevel) {
      case 0:
        return study
      case 1:
        return tired
      case 2:
        return veryTired
      case 3:
        return veryVeryTired
    }
  }

  return (
    <div className="emoticonSheet" style={{ imageRendering: 'pixelated' }}>
      <SpriteAnimator
        sprite={emoticonSheet}
        width={spriteWidth}
        height={spriteHeight}
        scale={scale}
        frameCount={frameCount}
        wrapAfter={wrapAfter}
        fps={fps}
        shouldAnimate={true}
        direction="horizontal"
        frame={emoticonCycle()}
      />
    </div>
  )
}
