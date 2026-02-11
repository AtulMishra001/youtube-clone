import mongoose from "mongoose";
import dotenv from "dotenv";
import {Video} from "./models/Video.js"

dotenv.config();
  // organized this as a simple array for easy maintenance and database seeding.
const sampleVideos = [
  {
    title: `"Where are you Tom...my big brother"|Tommy Shelby and Ada thorne |peaky blinders season 6`,
    description: `SHELBY BROTHERS EDIT 
        TOMMY SHELBY AND ADA THORNE
        PEAKY  BLINDERS SEASON 6

        Copyright Disclaimer under Section 107 of the copyright act 1976, allowance is made for fair use for purposes such as criticism, comment, news reporting, scholarship, and research. Fair use is a use permitted by copyright statute that might otherwise be infringing. Non-profit, educational or personal use tips the balance in favour of fair use
        #peakyblinders 
        #SHELBYBROTHERSEDIT 
        #tommyshelby`,
    thumbnailUrl: "https://i.ytimg.com/vi/GBYzSnHmJW4/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578827/_Where_are_you_Tom...my_big_brother__Tommy_Shelby_and_Ada_thorne__peaky_blinders_season_6_mkdpen.mp4",
    category: "Movie", // Matches your filter requirement
    views: 9000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988d9b4c7c1dcea65636d07", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `ELON MUSK MOTIVATIONAL VIDEO - BEST MOTIVATIONAL VIDEO | 1 Minute Motivation`,
    description: `Elon Reeve Musk, founder, CEO and chief engineer/designer of SpaceX, co-founder, CEO and product architect of Tesla, Inc, founder of The Boring Company; co-founder of Neuralink; and co-founder and initial co-chairman of OpenAI.

      Just Spend 1 minute to Stay Motivated!!!

      🚩DISCLAIMER:

      This is an educational and motivational video meant only for inspiring the viewers. Viewer's discretion is advised. Video clips used are for illustrative purpose only to make the point in the audio.

      All copyrights are acknowledged to their rightful owners. This Channel does not claim to own any copyrights. The sole purpose of this video is to inspire, empower and educate the viewers.

      🚩Just Spend 1 minute to Stay Motivated!!!
      `,
    thumbnailUrl: "https://i.ytimg.com/vi/gnJv0UdOC-Q/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578671/ELON_MUSK_MOTIVATIONAL_VIDEO_-_BEST_MOTIVATIONAL_VIDEO___1_Minute_Motivation_a6wjzm.mp4",
    category: "Movie", // Matches your filter requirement
    views: 170000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988d9b4c7c1dcea65636d07", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `React in 100 Seconds`,
    description: `React is a little JavaScript library with a big influence over the webdev world. Learn the basics of React in 100 Seconds `,
    thumbnailUrl: "https://i.ytimg.com/vi/Tn6-PIqc4UM/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578273/React_in_100_Seconds_foyto7.mp4",
    category: "Education", // Matches your filter requirement
    views: 1702572,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988bcf88e6d83e81207778e", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `Spin is NOT "purely quantum mechanical" | #VeritasiumContest`,
    description: `'ve heard many variations of this sentence in my study of QM. I don't mean to imply that physicists don't know what they are talking about when they say it, but as a beginner it may cause you to go "Oh, it's weird because it's quantum, I'll just not think about it!".

LIES IN THIS VIDEO:
I had to cut many details to shorten this into a one-minute video. The biggest lie is the implication that the electron spin (1/2) and the electromagnetic spin (1) are equally easy to describe classically. At the end of the day, everything is purely quantum mechanical (Gravity? What's that? Never heard of it); classical mechanics is an approximation of it. And it turns out that properly describing half-integer spins classically is MUCH more involved than doing for integer spins, if you want to get everything right and not end up with infinitely negative energies (https://www.reddit.com/r/AskScienceDi... ). Luckily for us, our Lord and Saviour JC Baez has, in his infinite generosity, done it for us mere mortals: https://johncarlosbaez.wordpress.com/...
So yes, spin 1/2 is, in a sense, more quantum mechanical than spin 1, but the point is that spin 1/2 is not impossible to describe classically, and that the weirdness of spin is mostly independent of the weirdness of quantum mechanics.`,
    thumbnailUrl: "https://i.ytimg.com/vi/NwIFTPq9zbo/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578417/Spin_is_NOT__purely_quantum_mechanical____VeritasiumContest_pcqcf6.mp4",
    category: "Education", // Matches your filter requirement
    views: 857,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988bcf88e6d83e81207778e", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `Playing With Time`,
    description: `Bending time and space in slow motion`,
    thumbnailUrl: "https://i.ytimg.com/vi/gooWdc6kb80/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578505/Playing_With_Time_wpveth.mp4",
    category: "Movie", // Matches your filter requirement
    views: 27000000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988d9b4c7c1dcea65636d07", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `Explained In A Minute: Neural Networks`,
    description: `Artificial Neural Networks explained in a minute.

As you might have already guessed, there are a lot of things that didn't fit into this one-minute explanation. You can read my accompanying blogpost for some more details on things I might have left out: https://arztsamuel.github.io/en/blogs...

If you like these kind of videos and would like to see more technical topics explained in a minute, let me know by pressing the like button.
`,
    thumbnailUrl: "https://i.ytimg.com/vi/rEDzUT3ymw4/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578827/Explained_In_A_Minute__Neural_Networks_etwl2z.mp4",
    category: "Education", // Matches your filter requirement
    views: 9010,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988bcf88e6d83e81207778e", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `Sung Jinwoo vs The Ant King Beru | Cinematic Short`,
    description: `Hope you enjoyed. First time getting to work with people on one of my projects. So this one is special!
Also a special shoutout to the goat, Gabriel Callaghan (@toxic_anims) `,
    thumbnailUrl: "https://i.ytimg.com/vi/wFU2hU7nE0k/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578167/Sung_Jinwoo_vs_The_Ant_King_Beru___Cinematic_Short_cwvaen.mp4",
    category: "Movie", // Matches your filter requirement
    views: 2100000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988d9b4c7c1dcea65636d07", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `Quantum computing explained in less than two minutes`,
    description: `Computers have been working in a similar fashion for the past 80 years. But that could be about to change.`,
    thumbnailUrl: "https://i.ytimg.com/vi/w_-_H9eBte8/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578250/Quantum_computing_explained_in_less_than_two_minutes_j235si.mp4",
    category: "Tech", // Matches your filter requirement
    views: 398009,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "69886b97618e4a36a11df346", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `Elon Musk Five Step Improvement Process`,
    description: `Elon's five-step process:

    1) Question the requirements
    2) Remove unnecessary process steps
    3) Optimize
    4) Accelerate
    5) Automate

    Clips taken from then cleaned up the audio and video from Everyday Astronaut.`,
    thumbnailUrl: "https://i.ytimg.com/vi/Jgw-_hlFQk4/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578679/Elon_Musk_Five_Step_Improvement_Process_jkuhi2.mp4",
    category: "Movie", // Matches your filter requirement
    views: 528000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988d9b4c7c1dcea65636d07", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `What a quantum computer sounds like`,
    description: `IBM just released an immersive audio visual tour of their Q lab, where the company researches quantum computers. What you're hearing could be the sound of the future.`,
    thumbnailUrl: "https://i.ytimg.com/vi/Tvst-xP2_Q8/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770577643/What_a_quantum_computer_sounds_like_fhdu5g.mp4",
    category: "Tech", // Matches your filter requirement
    views: 444000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988bcf88e6d83e81207778e", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `Nikola Tesla - Engineer & Inventor | Biography`,
    description: `Discover how Nikola Tesla invented alternating current and later the Tesla Coil. Learn about his adversarial relationship with previous employer Thomas Edison and his partnership with George Westinghouse before his tragic death.`,
    thumbnailUrl: "https://i.ytimg.com/vi/xP76q3quHb0/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578586/Nikola_Tesla_-_Engineer_Inventor___Biography_hmlpq5.mp4",
    category: "Movie", // Matches your filter requirement
    views: 150000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988d9b4c7c1dcea65636d07", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `WATCH: Footage from the 1969 Apollo 11 moon landing`,
    description: `Saturday marks the 55th anniversary of the Apollo 11 moon landing by Neil Armstrong and Buzz Aldrin. The cosmos is providing a full moon, and there are plenty of other events to honor the first lunar landing on July 20, 1969. Read more: https://bit.ly/46eLjjj `,
    thumbnailUrl: "https://i.ytimg.com/vi/hzApsIPHRwo/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770577516/WATCH__Footage_from_the_1969_Apollo_11_moon_landing_tjgia6.mp4",
    category: "Movie", // Matches your filter requirement
    views: 1200000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988d9b4c7c1dcea65636d07", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `Visuals Of Interstellar | 4K | Hans Zimmer | Aplucalypse |`,
    description: `Interstellar by Christopher Nolan is one of the best movies I've ever watched. The visuals, story, music everything about it is just perfect. The way the beauty of our universe is presented in this movie is just outstanding. Instantly knew that I had to make an edit on this! Hope you enjoyed watching this video. If you did, smash that like button, and also if you are new to my channel, please consider subscribing cuz it will mean a lot to me and make my day!`,
    thumbnailUrl: "https://i.ytimg.com/vi/1ZT6yWl3LPM/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770577993/Visuals_Of_Interstellar___4K___Hans_Zimmer___Aplucalypse___ysdejj.mp4",
    category: "Movie", // Matches your filter requirement
    views: 1866178,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988d9b4c7c1dcea65636d07", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `THE CURIOSITY GENE - POINT OF UNCERTAINTY`,
    description: `This video will inspire you and is aimed to remind you, that curiosity matters. This video is my imagination of the importance of asking question. I have had a lot of fun while making this short video. Hope you also enjoyed this video. 

Comment your views about it in the comment section.

"Knowledge is preferable to ignorance. Better by far to embrace the hard truth than a reassuring fable. If we crave some cosmic purpose, then let us find ourselves a worthy goal." - Carl Sagan`,
    thumbnailUrl: "https://i.ytimg.com/vi/HhPZ7yx8ttg/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578084/THE_CURIOSITY_GENE_-_POINT_OF_UNCERTAINTY_ltbz34.mp4",
    category: "Movie", // Matches your filter requirement
    views: 1100000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988d9b4c7c1dcea65636d07", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `"Oppenheimer" clip: Trinity`,
    description: `These things are hard on your heart." J. Robert Oppenheimer (Academy Award-nominee Cillian Murphy), leader of the Manhattan Project's efforts at Los Alamos, prepares for the test of the world's first detonation of a nuclear bomb, in this scene from Christopher Nolan's film, "Oppenheimer." Music by Oscar-nominee Ludwig Göransson.`,
    thumbnailUrl: "https://i.ytimg.com/vi/tK0IDmSYYGk/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578767/_Oppenheimer__clip__Trinity_slxqdm.mp4",
    category: "Movie", // Matches your filter requirement
    views: 2900000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988d9b4c7c1dcea65636d07", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `JavaScript in 100 Seconds`,
    description: `JavaScript is the the programming language that built the web. Learn how it evolved into a powerful tool for building websites, servers with Node.js, mobile apps, desktop software,`,
    thumbnailUrl: "https://i.ytimg.com/vi/DHjqpvDnNGE/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578678/JavaScript_in_100_Seconds_gehlca.mp4",
    category: "Education", // Matches your filter requirement
    views: 100000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988bcf88e6d83e81207778e", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `Learn HTML in 1 minute (FOR REAL)`,
    description: `I wish I had a video like this when I was learning HTML, it is so useful, and also so easy and fast to understand. I really hope this can help you all.

Also, try commenting "HTML" with your nose, just because I don't know what else I can write here.`,
    thumbnailUrl: "https://i.ytimg.com/vi/fjNrdpNdZ0o/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578566/Learn_HTML_in_1_minute_FOR_REAL_svnft6.mp4",
    category: "Education", // Matches your filter requirement
    views: 120000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988bcf88e6d83e81207778e", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `Computational Thinking for Problem Solving`,
    description: `Enroll in Computational Thinking for Problem Solving course here: https://www.coursera.org/learn/comput...`,
    thumbnailUrl: "https://i.ytimg.com/vi/d5nV8iz2vAk/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578777/Computational_Thinking_for_Problem_Solving_uvujwa.mp4",
    category: "Education", // Matches your filter requirement
    views: 4400,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988bcf88e6d83e81207778e", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `What is a Polymath?And Why Becoming One Changes Everything.`,
    description: `Discover the power of being a polymath, a person with expertise in multiple fields, and learn how to become one. A polymath is often referred to as a jack of all trades, but the true definition is more about being a master of all trades, like Leonardo da Vinci, who embodied the concept of a polymath. Bruce Wayne, the fictional character, is also a great example of a polymath, with his wide range of skills and expertise. Joe Rogan, a modern-day example, is also considered a polymath due to his diverse interests and skills. Being a polymath is not just about having many skills, but also about being able to connect the dots between different fields and create new ideas, which is a key concept in modern ideas and nextcore thinking. By embracing the concept of being a polymath, you can go beyond being a specialist and become a true Renaissance person, with a deeper understanding of the world and its complexities. In this video, we will explore what it means to be a polymath, how to become one, and why it's essential for personal growth and success, as discussed by experts like Joe Rogan and other thought leaders in the field of personal development and modern ideas.`,
    thumbnailUrl: "https://i.ytimg.com/vi/yqO35NOrTP4/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770577654/What_is_a_Polymath_And_Why_Becoming_One_Changes_Everything._tpu34f.mp4",
    category: "Movie", // Matches your filter requirement
    views: 56000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988d9b4c7c1dcea65636d07", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `Redis in 100 Seconds`,
    description: `Redis is an extremely fast in-memory database often used as a cache. It has evolved into a multi-model database with support for graphs, JSON documents, full-text search, and more. Try Redis Enterprise for free https://bit.ly/3wnVsXA`,
    thumbnailUrl: "https://i.ytimg.com/vi/G1rOthIU-uo/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578264/Redis_in_100_Seconds_u0efs2.mp4",
    category: "Education", // Matches your filter requirement
    views: 933607,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988bcf88e6d83e81207778e", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `Recursion in 100 Seconds`,
    description: `Learn how recursion ♾️works in 100 seconds. https://fireship.io`,
    thumbnailUrl: "https://i.ytimg.com/vi/rf60MejMz3E/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578244/Recursion_in_100_Seconds_yspija.mp4",
    category: "Education", // Matches your filter requirement
    views: 469959,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988bcf88e6d83e81207778e", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `Big-O Notation in 100 Seconds`,
    description: `Learn Big-O Notation in 100 Seconds (of Computer Science). ⚡🔬`,
    thumbnailUrl: "https://i.ytimg.com/vi/g2o22C3CRfU/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578763/Big-O_Notation_in_100_Seconds_uu6zyh.mp4",
    category: "Education", // Matches your filter requirement
    views: 625528,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988bcf88e6d83e81207778e", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `How AI Works`,
    description: `Start learning today!
https://code.org/ai/how-ai-works`,
    thumbnailUrl: "https://i.ytimg.com/vi/Ok-xpKjKp2g/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770578682/How_AI_Works_ucanzv.mp4",
    category: "Education", // Matches your filter requirement
    views: 278000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988bcf88e6d83e81207778e", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
  {
    title: `What is Artificial Intelligence? | Quick Learner`,
    description: `Science fiction has certainly familiarized the world with the concept of artificial intelligence. But outside of Hollywood…what is A.I. and what can it actually do?

𝐀𝐛𝐨𝐮𝐭 𝐃𝐮𝐤𝐞 𝐔𝐧𝐢𝐯𝐞𝐫𝐬𝐢𝐭𝐲
Established in 1924 in Durham, North Carolina, Duke University is one of the world’s leading institutions for education, research, and patient care. `,
    thumbnailUrl: "https://i.ytimg.com/vi/c0m6yaGlZh4/hqdefault.jpg",
    videoUrl:
      "https://res.cloudinary.com/drl0jljy4/video/upload/v1770577795/What_is_Artificial_Intelligence____Quick_Learner_dqywki.mp4",
    category: "Education", // Matches your filter requirement
    views: 349000,
    likes: [], // Starts empty for our new array-based logic
    dislikes: [],
    channelId: "6988bcf88e6d83e81207778e", // Replace with your real Channel ID
    uploader: "698868eeff9a46f6278f805c", // Replace with your real User ID
  },
];

export const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Connected to DB for seeding...");

    // Clear existing videos to avoid duplicates during testing
    await Video.deleteMany();

    // Inserting the organized Cloudinary data
    await Video.insertMany(sampleVideos);

    console.log(" Database Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};