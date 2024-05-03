module.exports = {
  title: `xininny.com`,
  description: `전미진의 개발일기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://xininny.github.io/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: ``, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'G-42SK0722KJ', // Google Analytics Tracking ID
  author: {
    name: `전미진`,
    bio: {
      role: `개발자`,
      description: ['매일 조금씩 성장하는', '배우는 것을 좋아하는', '이로운 것을 만드는'],
      thumbnail: 'sample.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/xininny`, // `https://github.com/zoomKoding`,
      linkedIn: ``, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `xininny@gmail.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2021.03 ~',
        activity: '가톨릭대학교 컴퓨터정보공학부 입학',
      },
      {
        date: '2021.02',
        activity: '삼성생명 SFP 금융 아카데미',
      },
      {
        date: '2023.05 ~ 2023.06',
        activity: '부스트코스 <BEYOND AI BASIC> 코칭스터디',
      },
      {
        date: '2023.07 ~ 2023.11',
        activity: 'KISIA AI보안 기술개발 개인정보반',
      },
      {
        date: '2023.08 ~ 2023.11',
        activity: '가리다(GaRiDa) 어플 개발',
      },
      {
        date: '2024.01 ~',
        activity: 'KISIA ICT 융합산업보안 크루 AI 보안',
      },
      {
        date: '2024.02 ~',
        activity: '개발 블로그 운영',
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '가리다(GaRiDa) 개발',
        description:
          '안전한 SNS 사용을 위한 개인정보 마스킹 어플 가리다(GaRiDa)를 개발하였습니다. \n 얼굴을 가릴 때 주고 사용하는 블러나 스티커가 아닌 얼굴을 반영한 생성형 이모지를 이용한 자연스러운 이미지 마스킹이 가능한 어플입니다.',
        techStack: ['Flutter', 'Docker', 'FastAPI'],
        thumbnailUrl: '가리다 배너.png',
        links: {
          post: '/garida-i4-intro',
          github: 'https://github.com/orgs/i4-AI-for-Security/repositories',
          demo:
            'https://www.figma.com/proto/yW2vZww4Cu4iIp7IGsyRwy/%EA%B0%80%EB%A6%AC%EB%8B%A4(GaRiDa)-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85?page-id=0%3A1&type=design&node-id=1-2779&viewport=526%2C365%2C0.09&t=n4hVTIITBt31pVWq-1&scaling=min-zoom&starting-point-node-id=1%3A2779&mode=design',
        },
      },
    ],
  },
};
