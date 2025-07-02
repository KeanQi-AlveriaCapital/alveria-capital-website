"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define the available languages
export type Language = "EN" | "中文";

// Define the context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "EN",
  setLanguage: () => {},
  t: (key: string) => key,
});

// Define the translations object
const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Navigation
    "nav.whoWeAre": "Who we are",
    "nav.whatWeDo": "What we do",
    "nav.news": "News",
    "nav.careers": "Careers",
    "nav.contact": "Contact",
    "nav.investorLogin": "Investor login",

    // Footer
    "footer.ready": "Ready to Partner with Us?",
    "footer.readyDescription":
      "Our team of investment specialists is ready to discuss your financial goals and how Alveria Capital can help you achieve exceptional returns.",
    "footer.contactUs": "Contact Us",
    "footer.aboutUs":
      "Alveria Capital is committed to adaptability and flexibility in navigating both traditional financial markets and digital assets.",
    "footer.hiring": "We're Hiring",
    "footer.hiringDescription":
      "Join our team of specialists and help us deliver exceptional returns for our investors.",
    "footer.applyNow": "Apply Now",
    "footer.stayInformed": "Stay Informed",
    "footer.stayInformedDescription":
      "Subscribe to our newsletter for the latest market insights and Alveria Capital updates.",
    "footer.yourEmail": "Your email address",
    "footer.thanks": "Thanks for subscribing!",
    "footer.terms": "Terms & Conditions",
    "footer.privacy": "Privacy Policy",
    "footer.legal": "Legal Notices",
    "footer.rights": "All rights reserved.",

    // Hero Section
    "hero.description":
      "We are committed to adaptability and flexibility in navigating the financial markets. Grounded in a disciplined, and research-driven approach to capture alpha opportunities, we are continuously navigating our investors across market cycles with the goal to achieve absolute returns.",

    // Who We Are Page
    "whoweare.title": "Who we are",
    "whoweare.overview": "Company Overview",
    "whoweare.description":
      "We are a hedge fund that unlocks parallels of investments not available in the open market. With our resources and proprietary technology developed in-house, we are committed to a constant generation of alpha, helping our clients exceed market average returns.",
    "whoweare.mission":
      "Mission: To achieve superior risk-adjusted returns through a diversified portfolio of global equities and crypto assets.",
    "whoweare.vision":
      "Vision: To become a leading global investment fund, widely recognized in the global investment community for its innovation and sustained excellence.",
    "whoweare.values":
      "Core values: integrity, responsibility, respect, innovation, teamwork",
    "whoweare.crypto":
      "Proactively focus on the digital asset space, explore investment opportunities in the cryptocurrency market, and invest under a strict risk control framework.",

    // What We Do Page
    "whatwedo.title": "What we do",
    "whatwedo.strategies": "Investment Strategies",
    "whatwedo.strategies.description":
      "We focus on diversified investment strategies, aiming to adapt to different market environments and capture potential growth opportunities:",
    "whatwedo.strategies.quant": "Quantitative High-Frequency Trading",
    "whatwedo.strategies.quant.description":
      "Use advanced mathematical models and technical analysis to build and execute high-speed trading strategies to capture short-term fluctuations and small price differences in the market",
    "whatwedo.strategies.discretionary": "Discretionary Trading",
    "whatwedo.strategies.discretionary.description":
      "Leverage the expertise, experience and deep market insights of our senior investment team to make flexible and proactive investment decisions and discover unique opportunities.",
    "whatwedo.markets": "Markets We Operate In",
    "whatwedo.markets.equity": "US equity",
    "whatwedo.markets.equity.description":
      "We have developed proprietary technology in-house that helps us monitor real-time market conditions, helping us to actively identify potential inefficiencies in the market.",
    "whatwedo.markets.crypto": "Cryptocurrency",
    "whatwedo.markets.crypto.description":
      "Proactively focus on the digital asset space, explore investment opportunities in the cryptocurrency market, and invest under a strict risk control framework.",
    "whatwedo.risk": "Risk Management",
    "whatwedo.risk.description":
      "We attach great importance to risk control and have built a comprehensive risk management system to ensure the safety of customer assets:",
    "whatwedo.risk.system":
      "We have established a multi-level, comprehensive risk management system covering market risk, credit risk, liquidity risk and operational risk, and have strict processes for risk monitoring and management.",
    "whatwedo.investor": "Investor Relations",
    "whatwedo.investor.description":
      "We are committed to establishing a transparent and efficient communication mechanism with investors:",
    "whatwedo.investor.process":
      "We clearly explain the investment decision-making process to investors and provide detailed investment reports on a regular basis to ensure that investors fully understand the performance and operation of the portfolio.",

    // Our Philosophy Section
    "philosophy.title": "Our Philosophy",
    "philosophy.part1":
      "At Alveria Capital, we are grounded in a disciplined, and research-driven approach to generating risk-adjusted returns. We recognize that the investment landscape has evolved significantly in recent years and cryptocurrencies are becoming an integral part of the global financial ecosystem.",
    "philosophy.part2":
      "Our philosophy embraces the need for adaptability and flexibility in navigating both traditional financial markets as well as cryptocurrencies.",
    "philosophy.part3":
      "We believe that in order to stay competitive in today's market environment, it is critical that a broader range of investment opportunities such as crypto investments be integral and inclusive in portfolios. While we are aware of the unique opportunities inherent in this asset class, we also apply the same rigorous principles to help mitigate the risk it offers as well.",

    // Investment Pillars
    "pillars.inefficient":
      "Markets are inefficient, but not always predictable",
    "pillars.inefficient.description":
      "We believe markets, both traditional and crypto, are inefficient at times, presenting opportunities for active management. Mispricings arise from investor sentiment, information gaps, and market structures. However, crypto markets often exhibit extreme volatility, which makes predicting short-term price movements difficult. Disciplined research and swift decision-making are key to taking advantage of these inefficiencies while managing volatility.",
    "pillars.risk": "Risk management is critical",
    "pillars.risk.description":
      "Managing risk is central to both traditional and crypto investments. Crypto assets are particularly volatile, and risks include regulatory uncertainty, liquidity issues, and cybersecurity threats. To mitigate these risks, we employ strict risk management frameworks including diversification, position sizing, stop-loss strategies, and derivatives (such as options or futures) to hedge against downside risks. Capital preservation is a top priority in all investments.",
    "pillars.opportunistic": "Opportunistic yet disciplined approach",
    "pillars.opportunistic.description":
      "We pursue an opportunistic investment strategy, seizing attractive opportunities as they arise in both traditional markets and the crypto space. However, we remain disciplined in following our core investment principles: focusing on assets with strong long-term potential, thorough research, and proven use cases. Crypto investments are approached with extra caution due to their volatility, but we see potential in projects with strong fundamentals and real-world use cases.",
    "pillars.absolute": "Absolute return focus",
    "pillars.absolute.description":
      "We prioritize absolute returns — achieving consistent, positive returns in both bull and bear markets. This philosophy guides us in seeking growth as well as mispriced opportunities across diverse asset classes, including digital assets.",
    "pillars.adaptability": "Adaptability and agility",
    "pillars.adaptability.description":
      "We maintain a flexibility and adaptability approach, continuously monitoring market conditions and adjusting strategies as market conditions change. In the crypto world, this is particularly important due to the rapid pace of technological change, new regulatory developments, and market trends. We aim to stay ahead of the curve while managing risk effectively.",

    // Our Commitment Section
    "commitment.title": "Our Commitment",
    "commitment.part1":
      "At Alveria Capital, we strive to deliver sustainable, risk-adjusted returns by blending the proven principles of traditional investing with an innovative approach to digital assets. Our philosophy emphasizes rigorous research, disciplined risk management, and adaptability in an ever-evolving financial landscape.",
    "commitment.part2":
      "We recognize cryptocurrencies and blockchain technology as key drivers of change in the global economy. By integrating these emerging assets into our portfolio alongside traditional investments, we aim to capture opportunities in both established and high-growth markets.",
    "commitment.part3":
      "With a commitment to adaptability and proactive management, we focus on navigating complexities and seizing opportunities across all asset classes. This balanced approach enables us to continue beating the market and deliver on superior returns for our investors.",

    //Contact Us Section
    "contactus.title": "Contact Us",
    "contactus.description":
      "Have questions or want to learn more about our investment strategies? We'd love to hear from you.",
    "contactus.section1.title": "Get in Touch",
    "contactus.section1.subtitle1": "Email Us",
    "contactus.section1.subtitle2": "Call Us",
    "contactus.section1.subtitle3": "Visit Us",
    "contactus.section2.title": "Send a message",
    "contactus.section2.label1": "Name",
    "contactus.section2.label2": "Email",
    "contactus.section2.label3": "Phone",
    "contactus.section2.label4": "Message",
    "contactus.section2.button": "Send Message",
    "contactus.section2.button.onclick": "Sending...",
    "contactus.section3.title": "Thank you",
    "contactus.section3.description":
      "Your message has been received. We'll get back to you shortly.",
  },
  中文: {
    // Navigation
    "nav.whoWeAre": "关于我们",
    "nav.whatWeDo": "业务范围",
    "nav.news": "新闻动态",
    "nav.careers": "招贤纳士",
    "nav.contact": "联系我们",
    "nav.investorLogin": "投资者登录",

    // Footer
    "footer.ready": "准备与我们合作？",
    "footer.readyDescription":
      "我们的投资专家团队随时准备讨论您的财务目标，以及Alveria Capital如何帮助您实现卓越回报。",
    "footer.contactUs": "联系我们",
    "footer.aboutUs":
      "Alveria Capital致力于在传统金融市场和数字资产领域保持适应性和灵活性。",
    "footer.hiring": "我们正在招聘",
    "footer.hiringDescription":
      "加入我们的专家团队，帮助我们为投资者带来卓越回报。",
    "footer.applyNow": "立即申请",
    "footer.stayInformed": "保持关注",
    "footer.stayInformedDescription":
      "订阅我们的通讯，了解最新的市场洞察和Alveria Capital动态。",
    "footer.yourEmail": "您的电子邮箱",
    "footer.thanks": "感谢您的订阅！",
    "footer.terms": "条款和条件",
    "footer.privacy": "隐私政策",
    "footer.legal": "法律声明",
    "footer.rights": "保留所有权利。",

    // Hero Section
    "hero.description":
      "我们是一家专注于发掘非公开市场投资机遇的专业对冲基金。凭借深厚行业资源和自主研发专有技术体系，我们致力于持续创造显著超额收益，助力客户实现超越市场基准的投资回报。",

    // Who We Are Page
    "whoweare.title": "我们是谁",
    "whoweare.overview": "公司概览",
    "whoweare.description":
      "我们是一家专注于发掘非公开市场投资机遇的专业对冲基金。凭借深厚行业资源和自主研发专有技术体系，我们致力于持续创造显著超额收益，助力客户实现超越市场基准的投资回报。",
    "whoweare.mission":
      "使命：通过全球股票及加密资产的多元化组合，实现卓越的风险调整收益。",
    "whoweare.vision":
      "愿景：成为全球领先的投资基金，以创新和持续的卓越表现，在全球投资领域中享有广泛认可。",
    "whoweare.values": "核心价值观：诚信、责任、尊重、创新、团队合作",
    "whoweare.crypto":
      "前瞻性地关注数字资产领域，探索加密货币市场的投资机会，并在严格的风控框架下进行投资。",

    // What We Do Page
    "whatwedo.title": "我们在做什么",
    "whatwedo.strategies": "投资策略",
    "whatwedo.strategies.description":
      "我们专注于多元化的投资策略，旨在适应不同的市场环境并捕捉潜在的增长机会：",
    "whatwedo.strategies.quant": "量化高频交易",
    "whatwedo.strategies.quant.description":
      "运用先进的数学模型和技术分析，构建并执行高速交易策略，以捕捉市场中的短期波动和微小价差",
    "whatwedo.strategies.discretionary": "主观交易",
    "whatwedo.strategies.discretionary.description":
      "凭借资深投资团队的专业知识、经验和深入的市场洞察，进行灵活的主动型投资决策，发掘特殊机会。",
    "whatwedo.markets": "参与市场",
    "whatwedo.markets.equity": "美国股市",
    "whatwedo.markets.equity.description":
      "我们自主研发的专有技术平台，能够实时监控市场动态，并主动识别潜在的市场低效性，为我们捕捉投资先机提供有力支持。",
    "whatwedo.markets.crypto": "加密货币",
    "whatwedo.markets.crypto.description":
      "前瞻性地关注数字资产领域，探索加密货币市场的投资机会，并在严格的风控框架下进行投资。",
    "whatwedo.risk": "风险管理",
    "whatwedo.risk.description":
      "我们高度重视风险控制，构建了完善的风险管理体系，以保障客户资产的安全：",
    "whatwedo.risk.system":
      "我们建立了多层次、全方位的风险管理体系，涵盖市场风险、信用风险、流动性风险和操作风险等，并有严格的流程进行风险监控和管理",
    "whatwedo.investor": "投资者关系",
    "whatwedo.investor.description":
      "我们致力于与投资者建立透明、高效的沟通机制：",
    "whatwedo.investor.process":
      "我们向投资者清晰地阐述投资决策流程，并定期提供详尽的投资报告，确保投资者充分了解投资组合的表现和运作情况。",

    // Our Philosophy Section
    "philosophy.title": "投资哲学",
    "philosophy.part1":
      "在 Alveria Capital，我们秉持严谨、以研究为导向的策略，致力于创造超额收益。我们深知，近年来世界投资格局已发生重大变化，加密货币正成为全球金融生态系统中不可或缺的一部分。",
    "philosophy.part2":
      "我们的理念是，无论是在传统金融市场还是加密货币市场，我们都需要具备适应性和灵活性。",
    "philosophy.part3":
      "我们认为，为了在当今的市场环境中保持竞争力，投资组合中必须包含更广泛的机会，例如加密货币。我们深知这一资产类别蕴含的独特机遇，同时也秉持审慎的原则，以降低其带来的风险。",

    // Investment Pillars
    "pillars.inefficient": "洞察市场，捕捉机遇",
    "pillars.inefficient.description":
      "我们认为无论是传统市场还是加密货币，都并非时刻有效，这为主动投资提供了机会。错误定价源于市场情绪、信息不完全和市场结构错配。严谨的研究和快速的决策是利用市场低效并管理组合波动性的关键。",
    "pillars.risk": "风险管理至关重要",
    "pillars.risk.description":
      "风险管理对于传统投资和加密货币投资都至关重要。加密货币资产极具波动性，风险包括监管不确定性、流动性问题和网络安全威胁。为了降低这些风险，我们采取严格的风险管理框架，包括但不限于分散投资、仓位调整、严格止损以及善用衍生品（例如期权或期货）来对冲价格下行风险。保全客户的资金是所有投资的首要任务。",
    "pillars.opportunistic": "把握机会，严守纪律",
    "pillars.opportunistic.description":
      "我们奉行机会主义的投资策略，在传统市场和加密货币领域抓住稍瞬即逝的投资机会。同时，我们始终秉持核心原则：专注于持有具长期潜力的资产。而且由于加密货币波动性较大，我们对投资持格外审慎的态度，但我们认为，拥有强劲基本面的项目具有潜力。",
    "pillars.absolute": "专注绝对收益",
    "pillars.absolute.description":
      "我们优先考虑绝对收益——无论市场牛熊，都能实现持续的正收益。这一理念引领我们在各类资产类别中，寻求长期增长潜力以及错误定价的投资机会。",
    "pillars.adaptability": "适应和敏捷",
    "pillars.adaptability.description":
      "我们秉持灵活和适应性原则，持续监测市场行情，并根据市场变化快速调整策略。在加密货币领域，由于技术变革、新监管发展和市场趋势的快速变化，这一点尤为重要。我们力求在有效管理风险的同时保持行业领先地位。",

    // Our Commitment Section
    "commitment.title": "我们的承诺",
    "commitment.part1":
      "在 Alveria Capital，我们致力于将久经考验的传统投资策略与创新的数字资产投资相结合，实现可持续的、风险调整后的超额回报。我们强调严谨的研究、风险管理以及在不断变化的市场环境中的适应能力。",
    "commitment.part2":
      "我们深刻认识到加密货币和区块链技术是推动全球经济变革的关键驱动。通过将这些新兴资产与传统投资策略相结合，我们力求在成熟市场和高增长市场中抓住机遇。",
    "commitment.part3":
      "我们致力于灵活应变和积极主动，专注于应对复杂局面，把握各类资产的机遇。这种均衡策略使我们能够持续超越市场，并为投资者带来卓越的回报。",

    //Contact Us Section
    "contactus.title": "联系我们",
    "contactus.description": "有任何疑问或想了解我们的投资策略？欢迎随时联系。",
    "contactus.section1.title": "立即联系",
    "contactus.section1.subtitle1": "邮箱",
    "contactus.section1.subtitle2": "电话号码",
    "contactus.section1.subtitle3": "地址",
    "contactus.section2.title": "发送消息",
    "contactus.section2.label1": "姓名",
    "contactus.section2.label2": "电子邮件",
    "contactus.section2.label3": "电话",
    "contactus.section2.label4": "留言内容",
    "contactus.section2.button": "发送消息",
    "contactus.section2.button.onclick": "发送中...",
    "contactus.section3.title": "谢谢",
    "contactus.section3.description": "我们已收到您的留言，将尽快与您联系。",
  },
};

// Create the LanguageProvider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize language from localStorage if available, otherwise use default
  const [language, setLanguageState] = useState<Language>("EN");

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "EN" || savedLanguage === "中文")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Update language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for using the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
