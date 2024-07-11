export interface Message {
  id: string,
  sender: string,
  content: string,
  dateTime: Date,
}
export enum MESSAGE_TYPE {
  USER = "user",
  ASSISTANT = "assistant"
}

export interface OpenAIResponse {
  content: string,
  run_id: string,
  thread_id: string
}

export class CharacterConstants  {

   public static readonly CHARACTERS = [
    {
      name: 'Kamal, 38',
      image: '../assets/Dress_c1/village_male_happy.png',
      Desc: '  Kamal is a knowledgeable local guide. With a passion for sharing insights and stories, Kamal ensures visitors have an enriching and memorable experience while exploring local landmarks.',
    },
    {
      name: 'Aman, 10',
      image: '../assets/Dress_c1/home_child_happy.png',
      Desc: ' Aman is a curious and energetic 10-year-old boy. He loves exploring new things, playing outdoor games, and has a keen interest in learning about the world around him',
    },
    {
      name: 'Sheema, 24',
      image: '../assets/Dress_c1/village_female_happy.png',
      Desc: ' Sheema is passionate about healthcare and has a strong desire to become a doctor. She aims to improve healthcare accessibility and quality in her village and other rural areas.',
    },
    {
      name: 'Gayatri, 57',
      image: '../assets/Dress_c1/village_old_sad.png',
      Desc: 'Gayatri is a 57-year-old woman with rich life experience despite not having a formal education. Her practical knowledge have been honed through years of hands-on experience and hard work.',
    },
    {
      name: 'Mohan, 51',
      image: '../assets/Dress_c1/market_male_happy.png',
      Desc: 'Mohan is a 51-year-old local shop owner in India. He has been running his shop for many years, gaining a wealth of experience in retail and customer service.',
    },
    {
      name: 'Nisha, 14',
      image: '../assets/Dress_c1/market_child_sad.png',
      Desc: ' Nisha is a 14-year-old girl who is currently attending school. She is at a crucial stage of her education, focusing on academic learning and personal development.',
    },
  ];
}
export interface LLamaAIResponse {
  content: string,
}

