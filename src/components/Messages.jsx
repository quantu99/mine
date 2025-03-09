import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import rose2 from '../assets/image/rose2.jpg';
import { motion, useInView } from 'framer-motion';

export function Messages() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const IMAGE_ARR = [
    {
      id: 1,
      title: 'Ngày 8/3 muộn',
      description: 'Xin chào em bé, đây là ngày 8/3 muộn đầu tiên của tụi mình. Lời đầu tiên cho anh xin lỗi em bé thật nhiều, không biết em ngày hôm qua như thế nào, còn anh thì xót ruột vô cùng, anh không thể chúc cũng như tặng quà cho bé đúng ngày như những người khác. Cốt là anh muốn giành mọi thứ để cho ngày hôm nay. Nhân dịp ngày 8/3 "muộn" này, anh chúc cô bé của anh luôn luôn KHỎE MẠNH, luôn luôn XINH ĐẸP, luôn luôn VUI VẺ, TƯƠI CƯỜI, và cuối cùng là phải luôn luôn HẠNH PHÚC. Bé cưng có một nụ cười siêu siêu đẹp luôn í!!!. Và còn nhiều hơn nữa, anh chúc bé cưng sẽ mãi luôn hạnh phúc bên gia đình và những người thương yêu của em(có cả anh nữa ><). Anh mong rằng dịp lễ đặc biệt lần này sẽ thật đáng nhớ đối với em! Anh yêu em ♥',
      image: '/1.png',
    },
    {
      id: 2,
      title: 'Ngày kỷ niệm một năm kể từ ngày đầu tiên tụi mình yêu nhau',
      description: 'Ya, huhuhu. Anh không biết phải nói gì nữa, lúc này anh 10 tỷ % vui và 10 tỷ % hạnh phúc. Tụi mình đã cùng nhau nắm tay bước qua một năm rồi đó bé ơiiii. Lúc này, khi mà anh ngồi viết những dòng chữ này, tìm kiếm những bức ảnh để ghép vào, và hơn cả thế nữa, anh ngồi nhìn và nhớ lại quãng đường mà cả hai đã cùng đi qua. Anh nghĩ về những kỷ niệm, về những chuyến đi, về những cuộc hẹn hò của cả hai đứa, và anh chỉ có thể thốt lên là:"Cứ như là một giấc mơ vậy". Khóe mắt anh lúc này lúc nào đã chực trào nước mắt không hay, ôi. Không phải là do anh yêu đuối đâu, mà anh thật sự hạnh phúc khi nghĩ đến việc tụi mình đã cùng nhau đi qua tất cả những thứ đó như thế nào: Vui vẻ, khó khăn, hạnh phúc rồi tức giận,...Tụi mình đã đi qua rất nhiều cung bậc thăng trầm của cảm xúc. Thật vậy, em đã đem đến cho anh một cuộc sống hoàn toàn khác, một cuộc sống tựa như một giấc mơ- một giấc mơ màu hồng và ngọt lịm. Thật may mắn rằng khi hiện tại, anh có được cơ hội bên cạnh em, được chia sẻ niềm vui và san sẻ những nỗi buồn cùng với bé cưng. Anh cảm ơn em thật thật nhiều. Nào, hãy cùng xem tụi mình đã cùng nhau làm được những gì nhé ^^!',
      image: rose2,
    },
    {
      id: 3,
      title: 'Vẽ tranh',
      description: 'Tụi mình đã cùng nhau làm nên bức artwork đầu tiên này, tất nhiên là sau một năm thì tụi mình chỉ có 2 bức artwork =))) Sau khi mặn nồng rồi thì tụi mình chỉ đi ăn mà thôiii. Note: Phải có nhiều artwork cùng nhau hơn nữa ><',
      image: '/2.jpg',
    },
    {
      id: 4,
      title: 'Chơi cờ',
      description: 'OMG, nói thật sự đây là cái bộ môn anh yêu thích từ siêu lâu rồi í. Nhưng với đầu óc ngớ ngẩn của anh thì quả thật anh chẳng thể nào hiểu cũng như nhớ nổi mặt chữ con cờ. Và em bé đến bắt anh bái sư, và giờ anh đã nhớ và hiểu luật chơi, thậm chí là đã chơi quen tay luôn rồi. Nhưng quy luật từ thuở hồng mang, trò thì chẳng bao giờ thắng nổi sư phụ. NOTE: Sư phụ đợi đấy, một ngày nào đó học trò sẽ vượt qua sư phụ. Sớm thôiiii',
      image: '/3.jpg',
    },
    {
      id: 5,
      title: 'Xem phim',
      description: 'Trước đây anh có sở thích là xem phim. Nhưng những màu phim của anh ảm đạm một màu u tối như chính con người anh vậy. Nhờ bé cưng mà anh đã xem thêm rất nhiều phim: Phim tình cảm này, phim HongKong này,... Và thậm chí anh lậm cả style của SẾP DŨNG(Một nhân vật trong phim "Hồ sơ trinh sát"-Ôi anh mê phim này điên ạ). NOTE: Phần 1 của Hồ sơ trinh sát không biết khi nào tụi mình mới xem xong nữa =))). Còn ở đấy Hoan Nhĩ, Cảnh Tây Trì đang đợi tụi mình kìa baby ồhhhh',
      image: '/4.jpg',
    },
    {
      id: 6,
      title: 'Xem Euro',
      description: 'Ôi, đây lại là một kỷ niệm siêu đáng nhớ. Anh vào nhà em bé xem đá banh mùa Euro 2024. Lâu lắm rồi anh chưa có dịp ngồi xem lại từng trận đấu bóng đá nhiều như thế, và dịp Euro 2024 vừa rồi sẽ là một kỷ niệm mà anh sẽ mãi không quên. Anh được xem bóng đá cùng với mẹ, cùng với em và đôi khi có cả bố nữa. Khoảnh khắc nhìn mẹ ngủ gục nhưng vẫn ráng coi, xong hai đứa cùng nhau nhìn mẹ và cười khúc khích. Rồi cả khoảnh khắc được ngồi ngắm em bé ngủ nữa, sau đó khi thức dậy em tặng cho anh một nụ hôn. OMG, I was flyingggg. Và khoảng thời gian này cũng là khoảng thời gian mà gần như lúc nào khi đi chơi, hay đi bất kỳ đâu, tụi mình cũng chơi trò thi nói tên Cầu thủ theo đội. Và theo một lẽ dĩ nhiên, em bé luôn là người chiến thắng ><',
      image: '/6.jpg',
    },
    {
      id: 7,
      title: 'Giải mật thư và học mã Morse',
      description: 'Nghe này, trên đời có rất nhiều việc làm anh bất ngờ. Nhưng một trong những câu chuyện mà lần nào được nghe lại anh đều luôn bất ngờ. Đó là về thành tích của bé cưng trong suốt những năm cấp 1 cấp 2. Do cấp 3 tụi mình học cùng nhau nhưng thời điểm này em bé sống quá là kín tiếng đi. Như kiểu công chúa giả dạng thường dân vậy đó. Trời ơi, cô gái của tôi là một người siêu hoàn hảo: Thành viên trong chi đội đánh trống của trường từng đi thi đấu; Từng đi thi đá banh; Từng thi đấu giải mật thư; Biết Mã Morse; Biết đánh cờ tướng; Biết xem đá banh; Từng đi thi vở sạch chữ đẹp; Vân vân và mây mây thành tích siêu đáng nể của em bé. Nếu mà không biết em, và chỉ tưởng tượng khi nghe qua những lời kể đó, anh sẽ nghĩ đến ngay một cá thể mọt sách siêu nổi bật trong lớp thôi. Ai có mà ngờ, đó là một cô bé xinh xắn đáng yêu như thế này. Tụi mình đã cùng nhau ngồi giải những đoạn mật thư lắc léo mà với mình(một kẻ luôn tự cao rằng mình thông minh) là siêu khó khăn, ngoài ra bé còn dạy anh mã Morse nữa. Nào, để anh kiểm tra lại kiến thức Morse của em bé. Dịch đoạn này trong 1 phút: .- -. .... / -.-- . . ..- / . -- / -... . / - .-. .- .- ..-. -. / .... ..- -.-- . . ..-. -. / - .-. .- .- -.',
      image: '/7.jpg',
    },
    {
      id: 8,
      title: 'Chụp ảnh',
      description: 'Yaaaaaaa, bây giờ đây chụp ảnh cho em bé đã trở thành đam mê của anh rồi. Anh luôn muốn được chụp ảnh cho bé, và nói cho em biết, anh siêu siêu thích khi được chụp ảnh cho bé, không một chút nản chí cho đến khi có thể chụp được một bức ảnh đẹp cho em. Và trong lĩnh vực này, với một người làm trong ngành kế toán, một ngành mà người ta luôn nghĩ là khô khan và không có một chút mảng miếng sáng tạo nào, thì bé Trân lại là một trường hợp vô cùng đặc biệt, hoàn toàn trái ngược lại với hình ảnh đó. Em có một đầu óc sáng tạo vô cùng, từ đôi mắt có thể nhìn ra cái đẹp một cách tỉ mỉ, và từ những tư duy, sáng kiến giúp tạo nên những cái đẹp đó. Vì vậy sư phụ à, hãy kiên nhẫn hơn với đồ nhi. >< Chắc chắn đồ nhi một ngày nào đó sẽ trở thành Photographer đỉnh cao riêng chỉ cho riêng mỗi mình sư phụ. Hì hì ^^',
      image: '/8.jpg',
    },
    {
      id: 9,
      title: "Du lịch",
      description: "Như một lẽ dĩ nhiên, những chuyến đi xa cùng nhau, tèn tèn trên con xe gắn máy. Vẫn luôn là những kỷ niệm đáng nhớ nhất của mỗi người ở cả hai đứa mình. Anh sẽ nói riêng về bản thân anh, những chuyến đi cùng em đều là những chuyến đi đầu tiên của anh. Lần đầu anh được trải nghiệm và chiêm ngưỡng những cái đẹp mà nó vốn nằm ở những nơi gần bên mình chứ chẳng phải ở đâu xa xôi. Là lần đầu anh được trải nghiệm những chuyến đi cùng người yêu của mình, được chăm sóc và lo lắng, quan tâm em ấy. Là chuyến đi Tri Tôn thơ mộng, đẹp đẽ. Là chuyến đi Long Xuyên vui vẻ, và gần đây nhất là chuyến đi An Giang- nơi được mệnh danh là Xứ sở thần tiên(Nhưng tình trạng chung của mỗi chuyến đi đều là những chuyến về nhà phong ba bão táp =))). Anh thật sự rất muốn đi cùng em đến nhiều nơi hơn nữa, trong nước và cả ngoài nước. NOTE:Anh sẽ cố gắng thật nhiều để điều ước này có thể trở thành sự thật ♥",
      image: '/9.jpg'
    },
    {
      id: 10,
      title: "Ăn những món ăn ngon",
      description: "Signature của tụi mình, đó là couple ăn uống. Không biết từ bao giờ, khi có những cuộc hẹn(thậm chí là không có những cuộc hẹn), tụi mình vẫn luôn nói về những món ăn ngon. Và thật hay hơn nữa đó chính là cả hai đứa đều mê việc nấu ăn. Hehe, nhờ em bé mà giờ đây anh đã quyết tâm mỗi ngày đều học thêm những món ăn mới để có thể nấu chúng cho em bé thưởng thức, hãy trông chờ nhé. NOTE: Tuần sau chắc chắn sẽ là món Tôm sốt cam siêu đỉnh đạc",
      image: '/10.jpg',
    },
    {
      id: 15,
      title: "Đón giáng sinh cùng nhau",
      description: 'Đây là "Giáng sinh đầu tiên", tựa như tên gọi một của một short film mà trùng hợp làm sao cả hai tụi mình đều đã từng rất nhiều lần xem qua. Năm nay anh được đón Giáng sinh cùng với mẹ và em bé, ngoài ra còn có cả Phúc Nguyễn nữa. Thật vui, anh mong rằng tụi mình sẽ đón 10 tỷ cái Giáng Sinh ngọt ngào như thế này lần sau nữa. Anh yêu em quá đi mất!!! MERRY CHRISTMAS!!!!!',
      image: '/15.jpg',
    },
    {
      id: 11,
      title: "Đón giao thừa cùng nhau",
      description: "Tuy chỉ là giao thừa Tết Tây, nhưng anh đã thật sự có cơ hội ở bên em cùng với mẹ chơi và ở bên nhau qua hết đêm giao thừa, được ngồi xem âm nhạc và tiết mục Count Down, sau đó là pháo hoa. Kỷ niệm này anh sẽ mãi không quên, thật vui ^^. Năm nay mình lại đi nhé ♥",
      image: '/11.jpg',
    },
    {
      id: 14,
      title: "Trang trí Tết",
      description: "Thời điểm cận Tết Ất Tỵ 2025 sẽ là một thời điểm mà anh sẽ mãi nhớ, trời ơi em không biết anh đã vui như thế nào trong suốt những ngày ấy đâu. Được đi mua đồ cùng chị Lan và bé, sau đó về mọi người cùng nhau chung tay, góp ý để decor nhà nhân dịp Tết đến. Huhu, lúc ấy anh cảm giác như mình đã là một phần của gia đình em rồi í. Thật sự hạnh phúc không nói nên lời...",
      image: '/14.jpg',
    },
    {
      id: 12,
      title: "Thân mật với mọi người trong gia đình của em hơn",
      description: "Và cuối cùng cũng là điều mà anh rất hạnh phúc, đó là có được tình cảm từ mọi người trong gia đình em. Từ papa, đến mama và cả chị Lan, mọi người giành tình cảm cho anh rất nhiều, và anh cũng vậy, anh cũng thương mọi người rất nhiều. Anh sẽ không khiến cho mọi người thất vọng về anh đâu, chắc chắn là như thế!!!",
      image: '/12.jpg',
    }
  ];

  // Handle wheel events to control scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTime = 0;
    const scrollThreshold = 500; // ms between scroll events

    const handleWheel = (e) => {
      const currentTime = new Date().getTime();
      
      if (currentTime - lastScrollTime > scrollThreshold) {
        if (e.deltaY > 0 && activeIndex < IMAGE_ARR.length - 1) {
          // Scroll down
          setActiveIndex(prev => prev + 1);
        } else if (e.deltaY < 0 && activeIndex > 0) {
          // Scroll up
          setActiveIndex(prev => prev - 1);
        }
        
        lastScrollTime = currentTime;
      }
      
      e.preventDefault();
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [activeIndex, IMAGE_ARR.length]);

  return (
    <div 
      className="h-screen w-full overflow-hidden bg-black relative"
      ref={containerRef}
    >
      {IMAGE_ARR.map((item, index) => (
        <StaircaseItem 
          key={item.id} 
          item={item} 
          index={index}
          isActive={index === activeIndex}
          totalItems={IMAGE_ARR.length}
          activeIndex={activeIndex}
        />
      ))}
    </div>
  );
}

const StaircaseItem = ({ item, index, isActive, totalItems, activeIndex }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: false });
  
  // Calculate position based on index and active index
  const getPosition = () => {
    if (index < activeIndex) {
      // Items that have been passed
      return {
        x: '-100vw',
        y: `${(index - activeIndex) * 100}vh`,
        opacity: 0.3,
        scale: 0.8,
      };
    } else if (index > activeIndex) {
      // Items yet to come
      const offset = index - activeIndex;
      return {
        x: '100vw',
        y: `${offset * 100}vh`,
        opacity: 0.3,
        scale: 0.8,
      };
    } else {
      // Current active item
      return {
        x: '0vw',
        y: '0vh',
        opacity: 1,
        scale: 1,
      };
    }
  };

  // Determine whether the movement should be horizontal or vertical for this step
  const isHorizontalStep = index % 2 === 1;
  
  // Customize the transition based on the step type
  const getCustomTransition = () => {
    // Base timing
    const duration = 0.8;
    
    // For active items becoming visible
    if (index === activeIndex) {
      return {
        duration: duration,
        type: "spring",
        stiffness: 50,
        damping: 14
      };
    }
    
    // For items moving out or waiting
    return {
      duration: duration,
      ease: "easeInOut"
    };
  };

  // Get diagonal position (combination of horizontal and vertical)
  const getDiagonalPosition = () => {
    const position = getPosition();
    
    // If this is a horizontal step, adjust the movement to be more horizontal
    if (isHorizontalStep) {
      if (index < activeIndex) {
        return {
          ...position,
          x: '-130vw',
          y: `${(index - activeIndex) * 50}vh`, // Less vertical movement
        };
      } else if (index > activeIndex) {
        return {
          ...position,
          x: '130vw', // More horizontal movement
          y: `${(index - activeIndex) * 50}vh`, // Less vertical movement
        };
      }
    }
    
    // For vertical steps, adjust to be more vertical
    else {
      if (index < activeIndex) {
        return {
          ...position,
          x: '-50vw', // Less horizontal movement
          y: `${(index - activeIndex) * 130}vh`, // More vertical movement
        };
      } else if (index > activeIndex) {
        return {
          ...position,
          x: '50vw', // Less horizontal movement
          y: `${(index - activeIndex) * 130}vh`, // More vertical movement
        };
      }
    }
    
    return position;
  };
  
  const position = getDiagonalPosition();

  return (
    <motion.div 
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
      ref={itemRef}
      initial={{ x: index === 0 ? 0 : '100vw', y: index === 0 ? 0 : '100vh', opacity: index === 0 ? 1 : 0 }}
      animate={{
        x: position.x,
        y: position.y,
        opacity: position.opacity,
        scale: position.scale,
      }}
      transition={getCustomTransition()}
    >
      <motion.div
        className={`flex w-full gap-40 items-center md:flex-row flex-col ${
          item.id % 2 !== 0 ? 'flex-row' : 'flex-row-reverse'
        } bg-black/60 p-6 rounded-lg backdrop-blur-sm justify-center mx-auto`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.7 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="relative flex items-center w-[400px] h-[300px]"
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ 
            scale: isActive ? 1 : 0.8,
            rotate: isActive ? 0 : -5,
          }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Image
            src={item.image}
            width={400}
            height={300}
            className="object-contain absolute top-0 left-0 w-full h-full"
            alt={`Image ${item.id}`}
          />
        </motion.div>
        <motion.div 
          className="flex flex-col gap-4 max-w-[500px]"
          initial={{ opacity: 0, x: item.id % 2 === 0 ? -20 : 20 }}
          animate={{ 
            opacity: isActive ? 1 : 0.7,
            x: isActive ? 0 : (item.id % 2 === 0 ? -10 : 10)
          }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className='relative'>
          <h2 className="font-love text-[#DAA520] text-[30px] font-semibold whitespace-nowrap">{item.title}</h2>
          <div className='text-[40px] text-[#DAA520] flex items-center justify-center font-love w-[60px] h-[60px] rounded-[50%] border border-dotted border-[#DAA520] border-r-transparent absolute -top-[10px] -left-12'>
            ""
          </div>
          </div>
          <p className="text-[#DAA520] font-love text-[24px] leading-8">{item.description}</p>
        </motion.div>
      </motion.div>
      
      {/* Navigation indicator */}
    </motion.div>
  );
}