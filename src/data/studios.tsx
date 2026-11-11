export type Studio = {
  id: string;
  name: string;
  category:
    | "Music Studio"
    | "Recording Studio"
    | "Photography Studio"
    | "Podcast Studio";
  location: string;
  price: string;
  icon: string;

  // Details page-এর optional information
  description?: string;
  imageUrl?: string;
  amenities?: any[];
  rules?: any[];
  currency?: string;
};

const studioList: Omit<Studio, "id">[] = [
  // ---------- Music Studio (14) ----------
  {
    name: "Creative Music Studio",
    category: "Music Studio",
    location: "Dhaka, Bangladesh",
    price: "৳1,500 / hour",
    icon: "🎵",
    description:
      "Creative Music Studio is a welcoming space for musicians, composers, and music enthusiasts. Whether you are practicing an instrument, developing a new melody, or working with your band, this studio offers a comfortable environment to bring your musical ideas to life.",
  },
  {
    name: "Rhythm House",
    category: "Music Studio",
    location: "Gulshan, Dhaka",
    price: "৳1,800 / hour",
    icon: "🎵",
    description:
      "Rhythm House is designed for musicians who love exploring beats, rhythm, and live performances. Its dedicated practice environment makes it a great choice for individual musicians and groups looking to improve their musical skills and prepare for performances.",
  },
  {
    name: "Sur Sagor Studio",
    category: "Music Studio",
    location: "Dhanmondi, Dhaka",
    price: "৳1,300 / hour",
    icon: "🎵",
    description:
      "Sur Sagor Studio provides a creative atmosphere for vocalists and instrumental musicians. From classical melodies to contemporary compositions, this space is suitable for practicing songs, exploring musical arrangements, and developing your artistic expression.",
  },
  {
    name: "Beat Factory",
    category: "Music Studio",
    location: "Uttara, Dhaka",
    price: "৳1,600 / hour",
    icon: "🎵",
    description:
      "Beat Factory is a creative destination for beat makers, musicians, and modern music creators. It offers a dedicated space to experiment with musical ideas, practice instruments, develop rhythmic patterns, and collaborate on exciting music projects.",
  },
  {
    name: "Melody Lab",
    category: "Music Studio",
    location: "Mirpur, Dhaka",
    price: "৳1,000 / hour",
    icon: "🎵",
    description:
      "Melody Lab is a friendly music practice space for beginners and experienced musicians alike. Whether you are learning a new instrument, rehearsing your favorite songs, or creating original melodies, this studio gives you room to focus on your passion.",
  },
  {
    name: "Tune Tank",
    category: "Music Studio",
    location: "Chattogram, Bangladesh",
    price: "৳1,400 / hour",
    icon: "🎵",
    description:
      "Tune Tank brings musicians together in a dedicated space for practice, creativity, and collaboration. It is suitable for instrumental sessions, songwriting activities, and group rehearsals where artists can explore new sounds and develop their musical ideas.",
  },
  {
    name: "Sylhet Sound Hub",
    category: "Music Studio",
    location: "Sylhet, Bangladesh",
    price: "৳1,100 / hour",
    icon: "🎵",
    description:
      "Sylhet Sound Hub offers a comfortable environment for local musicians and creative performers. From acoustic practice to group music sessions, the studio provides a place where artists can work on their performances and enjoy their musical journey.",
  },
  {
    name: "Raag Room",
    category: "Music Studio",
    location: "Rajshahi, Bangladesh",
    price: "৳900 / hour",
    icon: "🎵",
    description:
      "Raag Room is a dedicated space for musicians who appreciate melody, rhythm, and musical traditions. It is ideal for vocal practice, instrumental learning, and creative sessions where artists can develop their skills in a focused environment.",
  },
  {
    name: "Bass Box Studio",
    category: "Music Studio",
    location: "Banani, Dhaka",
    price: "৳2,200 / hour",
    icon: "🎵",
    description:
      "Bass Box Studio is built for musicians who enjoy powerful rhythms and energetic performances. It provides a dedicated environment for bass players, bands, and instrumentalists to rehearse, experiment with sounds, and prepare for their next performance.",
  },
  {
    name: "Jam Pad Studio",
    category: "Music Studio",
    location: "Khulna, Bangladesh",
    price: "৳800 / hour",
    icon: "🎵",
    description:
      "Jam Pad Studio is a relaxed creative space for musicians who enjoy playing together. Whether you are organizing a casual jam session, practicing with friends, or preparing original compositions, this studio gives you a place to make music together.",
  },
  {
    name: "Chorus Corner",
    category: "Music Studio",
    location: "Cumilla, Bangladesh",
    price: "৳700 / hour",
    icon: "🎵",
    description:
      "Chorus Corner is a suitable space for singers, vocal groups, and musicians who enjoy collaborative performances. It provides an environment for vocal rehearsals, group singing practice, and preparing coordinated musical performances.",
  },
  {
    name: "Harmony Hall",
    category: "Music Studio",
    location: "Narsingdi, Bangladesh",
    price: "৳900 / hour",
    icon: "🎵",
    description:
      "Harmony Hall is a welcoming music space for individuals and groups in Narsingdi. It is designed for instrument practice, vocal rehearsals, and collaborative music sessions, giving local artists a comfortable place to develop their creativity.",
  },
  {
    name: "Echo Nation Music Space",
    category: "Music Studio",
    location: "Mohammadpur, Dhaka",
    price: "৳1,700 / hour",
    icon: "🎵",
    description:
      "Echo Nation Music Space is a creative environment for musicians who want to experiment, collaborate, and refine their performances. From songwriting and instrumental practice to group rehearsals, it offers a dedicated place for musical exploration.",
  },
  {
    name: "Strings & Keys",
    category: "Music Studio",
    location: "Barishal, Bangladesh",
    price: "৳750 / hour",
    icon: "🎵",
    description:
      "Strings & Keys is a music practice space inspired by the beauty of instrumental music. It is suitable for guitarists, keyboard players, and other instrumentalists who want to practice regularly, improve their techniques, and explore new musical arrangements.",
  },

  // ---------- Recording Studio (14) ----------
  {
    name: "Black Room Studio",
    category: "Recording Studio",
    location: "Narsingdi, Bangladesh",
    price: "৳1,200 / hour",
    icon: "🎙️",
    description:
      "Black Room Studio is a dedicated recording environment for singers, voice artists, and independent music creators in Narsingdi. Whether you are recording vocals, producing a demo, or working on a personal audio project, this studio offers a focused space for your creative work.",
  },
  {
    name: "Red Wave Records",
    category: "Recording Studio",
    location: "Gulshan, Dhaka",
    price: "৳2,500 / hour",
    icon: "🎙️",
    description:
      "Red Wave Records is designed for artists who want to turn their musical ideas into professionally arranged recordings. It is suitable for vocal recording, music production, and creative audio sessions for singers, musicians, and independent producers.",
  },
  {
    name: "Studio 47",
    category: "Recording Studio",
    location: "Banani, Dhaka",
    price: "৳3,000 / hour",
    icon: "🎙️",
    description:
      "Studio 47 offers a dedicated recording space for serious musicians, vocalists, and audio creators. From recording original songs to developing polished audio projects, it provides an environment where artists can focus on capturing their best performances.",
  },
  {
    name: "Vocal Vault",
    category: "Recording Studio",
    location: "Dhanmondi, Dhaka",
    price: "৳1,900 / hour",
    icon: "🎙️",
    description:
      "Vocal Vault focuses on vocal recording and voice-based creative projects. It is a suitable choice for singers, voice-over artists, and content creators who need a dedicated environment to record songs, narration, and other audio content.",
  },
  {
    name: "Mix Master Studio",
    category: "Recording Studio",
    location: "Uttara, Dhaka",
    price: "৳2,000 / hour",
    icon: "🎙️",
    description:
      "Mix Master Studio is a creative workspace for recording artists and music producers. It is suitable for capturing vocals, arranging audio projects, and working on mixing and mastering sessions to bring greater clarity and balance to your sound.",
  },
  {
    name: "Sound Cave",
    category: "Recording Studio",
    location: "Chattogram, Bangladesh",
    price: "৳1,500 / hour",
    icon: "🎙️",
    description:
      "Sound Cave provides a dedicated recording environment for musicians, singers, and audio enthusiasts in Chattogram. It is suitable for music recording, voice-over sessions, and independent audio production projects that require focused creative time.",
  },
  {
    name: "Waveform Studio",
    category: "Recording Studio",
    location: "Sylhet, Bangladesh",
    price: "৳1,300 / hour",
    icon: "🎙️",
    description:
      "Waveform Studio is a creative audio space for artists who want to record and develop their sound. Whether you are working on a song, voice recording, or a personal audio project, the studio provides a dedicated setting for your recording sessions.",
  },
  {
    name: "Crimson Tape Studio",
    category: "Recording Studio",
    location: "Bashundhara, Dhaka",
    price: "৳2,300 / hour",
    icon: "🎙️",
    description:
      "Crimson Tape Studio is designed for music creators who value detailed recording and creative audio production. It is a suitable environment for vocalists, instrumentalists, and producers working on original tracks and professional audio projects.",
  },
  {
    name: "Silent Room Records",
    category: "Recording Studio",
    location: "Rangpur, Bangladesh",
    price: "৳800 / hour",
    icon: "🎙️",
    description:
      "Silent Room Records offers a focused recording environment for independent artists and voice creators. Its dedicated setting is suitable for recording songs, narration, voice-overs, and other audio projects that benefit from a quiet workspace.",
  },
  {
    name: "Pro Mix Dhaka",
    category: "Recording Studio",
    location: "Motijheel, Dhaka",
    price: "৳2,100 / hour",
    icon: "🎙️",
    description:
      "Pro Mix Dhaka is a creative recording destination for musicians, producers, and audio professionals. It is suitable for recording new tracks, refining audio arrangements, and working on mixing projects with a focus on sound quality.",
  },
  {
    name: "Echo Chamber",
    category: "Recording Studio",
    location: "Gazipur, Bangladesh",
    price: "৳1,000 / hour",
    icon: "🎙️",
    description:
      "Echo Chamber is a versatile audio recording space for singers, musicians, and digital content creators. From simple voice recordings to independent music projects, it offers a dedicated environment for bringing audio ideas together.",
  },
  {
    name: "Master Cut Studio",
    category: "Recording Studio",
    location: "Mymensingh, Bangladesh",
    price: "৳900 / hour",
    icon: "🎙️",
    description:
      "Master Cut Studio provides a creative workspace for recording and refining audio content. It is suitable for independent singers, voice-over artists, and musicians who want to record original material and develop their audio projects.",
  },
  {
    name: "Sonic Lab",
    category: "Recording Studio",
    location: "Bogura, Bangladesh",
    price: "৳850 / hour",
    icon: "🎙️",
    description:
      "Sonic Lab is a recording space for creative people who enjoy working with sound. Whether you are recording vocals, producing a demo, or developing a voice-based project, the studio offers a dedicated place to concentrate on your work.",
  },
  {
    name: "Amplify Studio",
    category: "Recording Studio",
    location: "Cox's Bazar, Bangladesh",
    price: "৳1,100 / hour",
    icon: "🎙️",
    description:
      "Amplify Studio is a creative audio destination for artists and content creators in Cox's Bazar. It is suitable for recording songs, voice-overs, and other audio projects in a dedicated environment designed to support creative expression.",
  },

  // ---------- Photography Studio (14) ----------
  {
    name: "Pixel Creative Space",
    category: "Photography Studio",
    location: "Dhaka, Bangladesh",
    price: "৳2,000 / hour",
    icon: "📸",
    description:
      "Pixel Creative Space is a versatile photography destination for portrait sessions, product photography, and creative visual projects. Whether you are a professional photographer or a content creator, this studio provides a dedicated setting to explore your visual ideas.",
  },
  {
    name: "Frame Factory",
    category: "Photography Studio",
    location: "Gulshan, Dhaka",
    price: "৳3,000 / hour",
    icon: "📸",
    description:
      "Frame Factory is designed for photographers, brands, and creative teams looking to produce attractive visual content. It is suitable for fashion photography, commercial shoots, portraits, and product campaigns that need a dedicated studio environment.",
  },
  {
    name: "Lens & Light Studio",
    category: "Photography Studio",
    location: "Dhanmondi, Dhaka",
    price: "৳2,200 / hour",
    icon: "📸",
    description:
      "Lens & Light Studio brings together photography and creative lighting in one dedicated workspace. It is ideal for portrait photography, professional headshots, product images, and artistic photo sessions where lighting and composition matter.",
  },
  {
    name: "Snap House",
    category: "Photography Studio",
    location: "Uttara, Dhaka",
    price: "৳1,800 / hour",
    icon: "📸",
    description:
      "Snap House is a friendly photography space for individuals, photographers, and creative content makers. From personal portraits to social media content and product photography, it offers a dedicated place to capture memorable visuals.",
  },
  {
    name: "Cyc Wall Studio",
    category: "Photography Studio",
    location: "Banani, Dhaka",
    price: "৳2,800 / hour",
    icon: "📸",
    description:
      "Cyc Wall Studio is a creative photography and production space suitable for clean-background shoots, fashion campaigns, and commercial visual projects. Its studio concept makes it a practical choice for photographers who need a controlled shooting environment.",
  },
  {
    name: "Golden Hour Studio",
    category: "Photography Studio",
    location: "Chattogram, Bangladesh",
    price: "৳2,000 / hour",
    icon: "📸",
    description:
      "Golden Hour Studio is a creative destination for photographers who love expressive portraits and beautiful visual storytelling. It is suitable for personal photoshoots, lifestyle photography, and creative sessions that capture special moments.",
  },
  {
    name: "Shutter Space",
    category: "Photography Studio",
    location: "Sylhet, Bangladesh",
    price: "৳1,600 / hour",
    icon: "📸",
    description:
      "Shutter Space provides a dedicated environment for photographers and visual creators in Sylhet. Whether you are capturing portraits, creating promotional images, or experimenting with photography concepts, this studio gives you room to work creatively.",
  },
  {
    name: "White Box Studio",
    category: "Photography Studio",
    location: "Mirpur, Dhaka",
    price: "৳1,500 / hour",
    icon: "📸",
    description:
      "White Box Studio is a simple and versatile photography space suitable for product photography, portraits, and clean commercial images. Its minimal studio concept helps photographers focus on their subjects and create visually consistent content.",
  },
  {
    name: "Flash Point Studio",
    category: "Photography Studio",
    location: "Rajshahi, Bangladesh",
    price: "৳1,200 / hour",
    icon: "📸",
    description:
      "Flash Point Studio is a creative workspace for photographers who want to capture sharp, expressive, and memorable images. It is suitable for portrait sessions, product shoots, and creative photography projects in Rajshahi.",
  },
  {
    name: "Portrait Palace",
    category: "Photography Studio",
    location: "Khulna, Bangladesh",
    price: "৳1,300 / hour",
    icon: "📸",
    description:
      "Portrait Palace is dedicated to portrait photography and personal visual storytelling. It offers a suitable setting for individual portraits, family photoshoots, professional headshots, and creative sessions designed to capture personality.",
  },
  {
    name: "Studio Aperture",
    category: "Photography Studio",
    location: "Narsingdi, Bangladesh",
    price: "৳1,400 / hour",
    icon: "📸",
    description:
      "Studio Aperture is a photography-focused creative space in Narsingdi for photographers, models, and content creators. It is suitable for portraits, product photography, and creative visual projects where composition and attention to detail are important.",
  },
  {
    name: "Dark Room Photo Lab",
    category: "Photography Studio",
    location: "Bashundhara, Dhaka",
    price: "৳2,400 / hour",
    icon: "📸",
    description:
      "Dark Room Photo Lab is a creative photography space for experimental shoots, artistic portraits, and visual storytelling. It is suitable for photographers who want to explore creative concepts and produce distinctive images for personal or commercial projects.",
  },
  {
    name: "Fashion Frame Studio",
    category: "Photography Studio",
    location: "Gulshan, Dhaka",
    price: "৳3,500 / hour",
    icon: "📸",
    description:
      "Fashion Frame Studio is tailored for fashion photographers, designers, models, and brands. It is a suitable destination for editorial photography, clothing campaigns, portfolio shoots, and promotional content that highlights fashion and personal style.",
  },
  {
    name: "Click Corner",
    category: "Photography Studio",
    location: "Cumilla, Bangladesh",
    price: "৳1,000 / hour",
    icon: "📸",
    description:
      "Click Corner is an accessible photography space for individuals and creative photographers in Cumilla. It is suitable for personal portraits, product images, social media content, and small photography projects that need a dedicated shooting location.",
  },

  // ---------- Podcast Studio (13) ----------
  {
    name: "The Quiet Booth",
    category: "Podcast Studio",
    location: "Narsingdi, Bangladesh",
    price: "৳900 / hour",
    icon: "🎧",
    description:
      "The Quiet Booth is a dedicated space for podcasters, interviewers, and audio storytellers in Narsingdi. Whether you are recording a solo episode, hosting a guest, or creating educational audio content, this studio provides a focused environment for your conversations.",
  },
  {
    name: "Talk Box Studio",
    category: "Podcast Studio",
    location: "Dhanmondi, Dhaka",
    price: "৳1,200 / hour",
    icon: "🎧",
    description:
      "Talk Box Studio is designed for meaningful conversations, interviews, and engaging podcast episodes. It is suitable for creators, presenters, and small teams who want a dedicated place to discuss ideas and produce conversational content.",
  },
  {
    name: "Pod Nest",
    category: "Podcast Studio",
    location: "Gulshan, Dhaka",
    price: "৳1,500 / hour",
    icon: "🎧",
    description:
      "Pod Nest offers a creative podcasting environment for individuals and collaborative teams. From weekly podcast episodes to guest interviews and branded discussions, this studio provides a dedicated space to turn conversations into engaging content.",
  },
  {
    name: "Mic Check Room",
    category: "Podcast Studio",
    location: "Uttara, Dhaka",
    price: "৳1,100 / hour",
    icon: "🎧",
    description:
      "Mic Check Room is a podcast-focused workspace for hosts, interviewers, and digital content creators. It is ideal for recording discussions, hosting guest conversations, and producing audio content for online platforms.",
  },
  {
    name: "Voice Hub",
    category: "Podcast Studio",
    location: "Chattogram, Bangladesh",
    price: "৳1,000 / hour",
    icon: "🎧",
    description:
      "Voice Hub is a dedicated space for spoken-word content, interviews, and podcast production in Chattogram. It is suitable for independent creators, educators, and presenters who want to share their ideas through recorded conversations.",
  },
  {
    name: "Podcast Point",
    category: "Podcast Studio",
    location: "Sylhet, Bangladesh",
    price: "৳900 / hour",
    icon: "🎧",
    description:
      "Podcast Point is a creative destination for people who enjoy sharing stories and discussing interesting topics. It provides a suitable environment for solo recordings, guest interviews, and collaborative podcast sessions.",
  },
  {
    name: "Speak Easy Studio",
    category: "Podcast Studio",
    location: "Banani, Dhaka",
    price: "৳1,800 / hour",
    icon: "🎧",
    description:
      "Speak Easy Studio is designed for polished conversations, professional interviews, and branded podcast content. It is a great option for presenters, business creators, and podcast teams looking for a dedicated space to communicate their ideas.",
  },
  {
    name: "Chat Cabin",
    category: "Podcast Studio",
    location: "Mirpur, Dhaka",
    price: "৳800 / hour",
    icon: "🎧",
    description:
      "Chat Cabin is a comfortable podcasting space for casual discussions, friendly interviews, and conversational content. It is suitable for new podcasters and experienced creators who want a dedicated place to record engaging conversations.",
  },
  {
    name: "On Air Room",
    category: "Podcast Studio",
    location: "Rajshahi, Bangladesh",
    price: "৳750 / hour",
    icon: "🎧",
    description:
      "On Air Room is a dedicated recording space for podcast hosts, presenters, and digital broadcasters. It is suitable for talk shows, interviews, educational discussions, and other spoken-word content created for online audiences.",
  },
  {
    name: "Story Booth",
    category: "Podcast Studio",
    location: "Khulna, Bangladesh",
    price: "৳700 / hour",
    icon: "🎧",
    description:
      "Story Booth is made for storytellers, creative speakers, and podcast enthusiasts. It offers a dedicated environment for sharing personal experiences, recording narrative episodes, and producing engaging audio stories.",
  },
  {
    name: "Audio Gram Studio",
    category: "Podcast Studio",
    location: "Barishal, Bangladesh",
    price: "৳650 / hour",
    icon: "🎧",
    description:
      "Audio Gram Studio is a creative space for audio-first content creators in Barishal. It is suitable for podcast episodes, interviews, voice-based educational content, and discussions that bring interesting ideas to listeners.",
  },
  {
    name: "Conversation Corner",
    category: "Podcast Studio",
    location: "Mymensingh, Bangladesh",
    price: "৳700 / hour",
    icon: "🎧",
    description:
      "Conversation Corner provides a dedicated environment for discussions, interviews, and collaborative podcast recordings. It is suitable for creators who enjoy exchanging ideas, inviting guests, and producing informative conversational content.",
  },
  {
    name: "Live Cast Studio",
    category: "Podcast Studio",
    location: "Mohammadpur, Dhaka",
    price: "৳1,300 / hour",
    icon: "🎧",
    description:
      "Live Cast Studio is a creative workspace for podcast hosts, online presenters, and digital broadcasters. It is suitable for recording podcast episodes, preparing live-style discussions, and producing engaging content for digital audiences.",
  },
];

// Automatically generate unique IDs for all studios
export const studios: Studio[] = studioList.map((studio, index) => ({
  ...studio,
  id: String(index + 1),
}));