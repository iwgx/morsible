import { useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import tw from 'twin.macro'
import { FaMicrophone, FaStop } from "react-icons/fa";
import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';

import { getLanguageCode } from '../utils';

interface IProps {
  language: string,
  updateText: (text: string[]) => void
}

function Recorder({ updateText, language }: IProps) {
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    timeout: 10000,
    speechRecognitionProperties: {
      lang: getLanguageCode(language)
    },
    crossBrowser: true,
    googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    googleCloudRecognitionConfig: {
      languageCode: getLanguageCode(language)
    }
  });

  const { t } = useTranslation('common')

  if (error) toast.error(`${error}`)

  useEffect(() => { updateText(results) }, [results])

  return (
    <div>
      <button
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
        tw="text-sm lg:text-base border text-white rounded-lg px-4 lg:px-6 py-2 focus:(border-transparent ring-2 outline-none)"
        css={[isRecording ? tw`bg-red-500 focus:ring-red-300` : tw`bg-green-500 focus:ring-green-300` ]}
      >
        { 
          isRecording
            ? <div tw="flex items-center"><FaStop size="14" /><span tw="ml-2">{ t('button.stop') }</span></div>
            : <div tw="flex items-center"><FaMicrophone /><span tw="ml-2">{ t('button.speak') }</span></div>
        }
      </button>
    </div>
  )
}

export default Recorder
