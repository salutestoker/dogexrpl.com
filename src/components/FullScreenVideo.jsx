"use client";
import styles from "./FullScreenVideo.module.scss";
import React, { useEffect, useRef } from 'react';

export const FullScreenVideo = () => {


  return (
    <div className={styles['intro-video']}>
      <video src="./videos/intro-loop.mp4" autoPlay playsInline muted></video>
    </div>
  )
}