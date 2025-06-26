// app/components/About/ModalData.ts

export interface ModalContent {
  title: string;
  content: string | JSX.Element;
}

const modalData: ModalContent[] = [
  {
    title: "Who Am I?",
    content: (
      <>
        I’m Nibir, a full-stack developer with a passion for decentralization, AI, and meaningful design.
        <br />
        My journey began in the corridors of Faujdarhat Cadet College, where discipline met curiosity.
        <br />
        Now, as a CSE student at BRAC University, I explore technology that empowers — from blockchain identity systems to playful 3D experiences like this one.
      </>
    ),
  },
  {
    title: "Education",
    content: (
      <>
        • Faujdarhat Cadet College — SSC & HSC, GPA 5.0  
        <br />
        • BRAC University — B.Sc. in Computer Science & Engineering (2026 expected)
      </>
    ),
  },
  {
    title: "Skills",
    content: (
      <>
        Languages: Python, JavaScript, TypeScript, C, C++  
        <br />
        Frameworks: React, Next.js, Node.js, Express.js  
        <br />
        Databases: MongoDB, MySQL  
        <br />
        Tools: Git, REST APIs, Shell, AI basics, Blockchain basics
      </>
    ),
  },
  {
    title: "Hobbies & Interests",
    content: (
      <>
        🧠 Building cool tech | 🎸 Playing guitar | 🍳 Cooking | 🎮 Gaming  
        <br />
        I also enjoy mentoring others and tinkering with experimental UI design.
      </>
    ),
  },
  {
    title: "Certifications & Awards",
    content: (
      <>
        • Duke of Edinburgh’s International Award (Bronze)  
        <br />
        • 21st Century Employability Skilling Program (Advanced)  
        <br />
        • BRAC University Business Club (BIZ BEE) — Assistant Director
      </>
    ),
  },
];

export default modalData;
