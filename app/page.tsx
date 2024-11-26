'use client'
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import { InformationCircleIcon, PuzzlePieceIcon } from '@heroicons/react/16/solid';

import Link from 'next/link';

export default function Home() {

  const [numberPairs, setNumberPairs] = useState<number[]>([0,0,0,0,0,0]);
  const [isAnimated, setIsAnimated] = useState<boolean>(true);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRandomization = () => {

    setIsAnimated(true);

    intervalRef.current = setInterval(() => {
      const randomNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 99) +1);
      setNumberPairs(randomNumbers);
    }, 150);

  }

  const stopRandomization = () => {

    if (intervalRef.current) 
    {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsAnimated(false);
  }

  const actionSpin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isSpinning) return;
    
    setIsSpinning(true);
    startRandomization();

    const isJackpot = Math.random() < 0.11;
    let jackpotPairs: number[];

    if (isJackpot) 
    {
      const jackPotNumber = Math.floor(Math.random() * 99) + 1;
      jackpotPairs = Array(6).fill(jackPotNumber);

      setTimeout(() => {
        setNumberPairs(jackpotPairs);
        stopRandomization();

        Swal.fire({
          text: 'Anda Miskin, Cari Kerja Sana sAt! Ngapain Main Judol?',
          icon: 'error'
        });

        setIsSpinning(false);
      }, 5000)

     
    } else {

      setTimeout(() => {
        jackpotPairs = Array.from({ length: 6 }, () => Math.floor(Math.random() * 99) + 1);
        setNumberPairs(jackpotPairs);
        stopRandomization();

        Swal.fire({
          text: 'Dikit Lagi, He He He',
        });

        setIsSpinning(false);
      }, 5000)


    }

  }

  const showAbout = () => {
    Swal.fire({
      text: `
        Platform ini adalah simulasi judi online untuk menyadarkan masyarakat 
        betapa bahayanya Judi baik offline maupun online. Terutama Judi online
        yang marak terjadi di masyarakat
      `
    })
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">

      <div className='flex space-x-4 text-5xl font-bold text-center'>

        {numberPairs.map((num, index) => (
          <h3 
          key={index}
          className={`border border-indigo-400 px-8 py-4 transition-transform rounded-lg ${isAnimated ? 'animate-pulse' : ''}`}>
            {num < 10 ? `0${num}` : num}
          </h3>
        ))}
       
      </div>

      <div className='flex space-x-2'>
        <button className='btn btn-primary font-extrabold mt-8' onClick={actionSpin} disabled={isSpinning}>
          PUTAR MESINNYA<PuzzlePieceIcon className='size-6 text-white'/>
        </button>
        <button className='btn btn-gray-100 mt-8' onClick={showAbout}>
          <InformationCircleIcon className='size-6 text-indigo-500'/>
        </button>
      </div>

      <div className='flex space-x-4 text-small mt-8'>
        <Link href="https://www.imgn-creative.com" className='text-indigo-300 font-semibold py-3' target='_blank' rel='noopener noreferrer'>IMGN CREATIVE STUDIO | </Link>
        <Link href="https://instagram.com/imgncreative.studio" className='bg-gray-100 text-black px-4 py-3 rounded-lg' target='_blank' rel='noopener noreferrer'>Follow Us</Link>
      </div>

    </main>
  )
}
