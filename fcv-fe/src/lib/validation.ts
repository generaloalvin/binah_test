

export const validateAudioFile = (file: File): { valid: boolean, error?: string } => {
  // check that audio file is a .wav file
  if (file.type !== "audio/wav") {
    return {
      valid: false,
      error: "Invalid file type. Please upload a .wav file",
    };
  }

  return {
    valid: true,
  };
};
