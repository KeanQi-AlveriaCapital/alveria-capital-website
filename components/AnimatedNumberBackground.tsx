"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// Register the plugin
gsap.registerPlugin(MorphSVGPlugin);

interface AnimatedNumberBackgroundProps {
  number: number;
  strokeWidth?: string;
  scale?: number;
}

// Animated SVG Component for background numbers
const AnimatedNumberSVG = ({ number, strokeWidth = "0.2", scale = 1.3 }: { number: number; strokeWidth?: string; scale?: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const previousNumber = useRef<number>(number);

  // Get custom positioning and transform for each number
  const getNumberTransform = (num: number) => {
    // CENTERED VERSION (Current) - properly centered accounting for path dimensions
    switch (num) {
      case 1:
        return `translate(960, 540) scale(${scale}) translate(-500, -350)`;
      case 2:
        return `translate(960, 540) scale(${scale}) translate(-750, -350)`;
      case 3:
        return `translate(960, 540) scale(${scale}) translate(-900, -350)`;
      case 4:
        return `translate(960, 540) scale(${scale}) translate(-750, -350)`;
      case 5:
        return `translate(960, 540) scale(${scale}) translate(-950, -350)`;
      default:
        return `translate(960, 540) scale(${scale}) translate(-750, -350)`;
    }

    // RIGHT-POSITIONED VERSION (Alternate - uncomment to use)
    // switch (num) {
    //   case 1:
    //     return "translate(1520, 540) scale(0.8) translate(-800, -500)";
    //   case 2:
    //     return "translate(1520, 540) scale(0.8) translate(-1000, -500)";
    //   case 3:
    //     return "translate(1420, 540) scale(0.8) translate(-1000, -450)";
    //   case 4:
    //     return "translate(1520, 540) scale(0.8) translate(-780, -400)";
    //   case 5:
    //     return "translate(1520, 540) scale(0.8) translate(-1000, -530)";
    //   default:
    //     return "translate(1520, 540) scale(0.8) translate(-800, -450)";
    // }
  };

  // Initialize the SVG with the starting number
  useEffect(() => {
    if (svgRef.current) {
      const path = svgRef.current.querySelector('path');
      const group = svgRef.current.querySelector('g');
      if (path && group) {
        console.log('🚀 Initializing SVG with number:', number);
        // Set initial path and transform without animation
        const initialPath = getPathDataForNumber(number);
        const initialTransform = getNumberTransform(number);
        path.setAttribute('d', initialPath);
        group.setAttribute('transform', initialTransform);
        previousNumber.current = number;
        console.log('✅ SVG initialized');
      }
    }
  }, []); // Only run once on mount

  // Manual morphing when number changes
  useEffect(() => {
    if (previousNumber.current !== number && svgRef.current) {
      const path = svgRef.current.querySelector('path');
      const group = svgRef.current.querySelector('g');
      
      if (path && group) {
        console.log(`🔄 MORPH: ${previousNumber.current} → ${number}`);
        
        // Get paths and transforms for morphing
        const fromPath = getPathDataForNumber(previousNumber.current);
        const toPath = getPathDataForNumber(number);
        const fromTransform = getNumberTransform(previousNumber.current);
        const toTransform = getNumberTransform(number);
        
        console.log('From path length:', fromPath.length);
        console.log('To path length:', toPath.length);
        
        // Set starting path and transform
        path.setAttribute('d', fromPath);
        group.setAttribute('transform', fromTransform);
        
        // Create timeline for simultaneous animations
        const tl = gsap.timeline({
          onStart: () => console.log('🟢 MORPH Animation Started'),
          onComplete: () => {
            console.log('🎯 Morph complete');
            previousNumber.current = number;
          }
        });

        // Animate path morphing and transform simultaneously
        tl.to(path, {
          morphSVG: toPath,
          duration: 1.2,
          ease: "power2.inOut"
        }, 0)
        .to(group, {
          attr: { transform: toTransform },
          duration: 1.2,
          ease: "power2.inOut"
        }, 0);
        
      } else {
        console.error('❌ No path or group element found');
      }
    }
  }, [number]);

  // Function to get path data for morphing
  const getPathDataForNumber = (num: number) => {
    console.log('🎨 Getting path for number:', num);
    
    // Original beautiful SVG paths from the design files
    switch (num) {
      case 1:
        return "M560.759 859.526L560.326 859.25C536.121 843.806 499.81 821.373 451.391 791.949L451.38 791.942C405.516 762.522 356.465 732.735 304.229 702.579C245.621 668.744 187.651 636.749 130.319 606.593L130.308 606.587C75.5174 576.428 32.835 553.258 2.25819 537.077L1.78626 536.827L42.8092 513.145L43.2422 513.395C106.916 550.154 166.715 572.911 222.636 581.715C279.672 589.76 339.347 575.878 401.708 539.877L864.25 272.851C924.442 238.103 962.969 208.731 979.913 184.734L980.705 183.595C997.196 159.428 993.4 135.265 969.275 111.075L969.273 111.073C946.377 87.5748 906.284 59.28 848.959 26.1864L848.526 25.9364L891.429 1.16848L891.862 1.40479C986.138 52.888 1070.84 92.226 1145.97 119.427L1149.5 120.694C1223.56 147.17 1301.31 164.385 1382.76 172.342L1383.93 172.456L574.593 639.684C513.47 674.97 486.247 706.865 492.58 735.386L492.734 736.056C499.492 764.476 535.633 797.652 601.352 835.592L601.785 835.842L560.759 859.526Z";
      case 2:
        return "M1382.62 103.2C1470.6 153.992 1519.11 206.289 1528.05 260.09L1528.06 260.091C1539.55 313.918 1506.33 363.307 1428.49 408.241C1377.45 437.706 1316.84 458.7 1246.67 471.222V471.223C1179.08 483.739 1105.12 491.099 1024.8 493.307L1024.79 493.308C945.768 494.779 864.839 494.411 781.999 492.204H781.989C700.445 489.261 620.175 487.055 541.18 485.584L541.169 485.583C463.944 483.39 392.392 485.195 326.509 490.992L713.653 714.49C739.758 729.561 762.819 740.853 782.839 748.374C802.86 755.896 819.774 759.622 833.611 759.626C862.732 758.894 897.65 749.751 938.389 732.112L938.814 731.928L972.115 751.153L971.682 751.403C904.151 790.389 852.55 820.913 816.879 842.977L810.475 846.959C778.674 866.783 750.235 885.312 725.156 902.548L724.619 902.917L724.17 902.51C715.839 894.952 698.551 882.861 672.273 866.225L666.896 862.837C637.594 844.45 603.834 823.488 565.614 799.953L565.613 799.953L1.33712 474.197L34.4303 455.092L34.6671 455.085C114.969 452.878 205.459 453.613 306.136 457.292C408.051 460.234 511.877 459.866 617.616 456.189L617.616 456.188L622.688 456.011C729.116 452.154 831.222 440.817 929.007 422L929.011 422L931.395 421.549C1032.26 402.386 1121.86 370.2 1200.18 324.986C1272.75 283.088 1307.66 243.088 1305.12 204.977V204.964C1305.12 166.83 1275.27 130.503 1215.47 95.9761C1164.59 66.6056 1102.27 48.2473 1028.49 40.9031L1028.47 40.9021C955.962 32.8237 873.238 36.4918 780.286 51.9287L779.692 52.0273L779.526 51.6846L766.147 24.099L765.994 23.7831L766.528 23.6713L769.341 23.0883C828.469 10.9247 891.302 3.75699 957.836 1.58286L957.837 1.58237L961.126 1.48521C1030.22 -0.429347 1099.92 5.86382 1170.23 20.3604L1170.24 20.3619L1173.65 21.0957C1245.18 36.6971 1314.84 64.0708 1382.62 103.2Z";
      case 3:
        return "M1665.13 90.4415C1718.69 121.365 1756.97 153.772 1779.94 187.663C1805.46 221.548 1813.13 254.712 1802.92 287.147L1802.54 288.666C1794.41 320.522 1767.7 349.508 1722.47 375.622C1672.69 404.36 1612.69 422.782 1542.49 430.888V430.889C1474.88 438.99 1404.08 439.357 1330.11 431.994L1330.09 431.993C1258.48 424.015 1189.95 411.388 1124.52 394.117C1182.11 429.11 1226.65 468.054 1258.14 510.947L1259.68 512.951C1291.7 555.024 1303.95 597.819 1296.42 641.33L1296.23 642.366C1288.17 686.208 1251.2 727.13 1185.38 765.127C1126.7 799.007 1058.43 822.21 980.6 834.732C905.336 847.251 824.342 850.563 737.625 844.674C650.921 840.256 563.585 828.11 475.621 808.239V808.238C386.385 789.103 300.974 764.082 219.39 733.174V733.173C139.081 703 66.4164 669.148 1.40036 631.614L0.96734 631.364L36.229 611.007L36.6621 611.247L39.7719 612.966C105.207 648.955 178.663 678.89 260.14 702.771L260.151 702.774L263.972 703.938C344.269 728.269 427.027 744.051 512.249 751.286L512.257 751.287L516.371 751.657C602.771 759.264 687.316 755.834 770.012 741.367L770.022 741.365L774.013 740.701C857.708 726.554 934.016 699.592 1002.94 659.803C1078.05 616.444 1121.29 570.167 1132.74 520.975L1132.74 520.971L1132.74 520.965C1146.72 471.811 1125.14 427.799 1067.98 388.905C1041.28 382.298 1017.12 376.425 995.494 371.285L995.48 371.282L995.468 371.279C976.308 366.117 960.952 360.211 949.421 353.554C939.186 347.645 933.348 342.061 932.047 336.802L932.04 336.778V336.753C932.04 330.768 935.935 325.53 943.687 321.055C955.313 314.343 969.549 312.107 986.308 314.34L987.866 314.556C1003.91 316.866 1018.15 321.61 1030.56 328.779C1040.78 334.679 1049.73 341.316 1057.39 348.687C1067.53 356.004 1078.3 363.685 1089.7 371.73C1181.28 379.055 1262.01 375.739 1331.92 361.797C1403.2 347.101 1463.01 325.795 1511.35 297.884C1571.18 263.347 1599.08 229.603 1595.27 196.643L1595.27 196.635V196.627C1594 163.638 1567.98 132.456 1517.09 103.079C1464.93 72.9675 1402.6 53.1382 1330.08 43.5896V43.5906C1258.85 34.7792 1179.96 38.4463 1093.39 54.6153L1092.83 54.7207L1092.63 54.3985L1075.43 26.8134L1075.22 26.4848L1075.79 26.3622C1136.05 13.3165 1198.78 5.26553 1263.98 2.20804L1267.09 2.06596C1334.71 -1.61595 1401.69 3.17255 1468.03 16.4288C1536.94 29.6908 1602.64 54.3675 1665.13 90.4415Z";
      case 4:
        return "M1532.3 1.54809L1562.94 19.2383L783.12 469.431L805.624 482.422C831.729 497.493 854.79 508.784 874.809 516.306C894.836 523.83 911.756 527.556 925.594 527.558C954.713 526.824 989.627 517.68 1030.36 500.043L1030.78 499.859L1064.09 519.084L1063.65 519.334C1001.22 555.378 954.078 583.328 922.231 603.184L916.296 606.894C886.811 625.382 860.126 642.898 836.242 659.444L835.67 659.841L835.236 659.389C828.909 652.815 815.584 643.65 795.201 631.883L795.185 631.874L795.172 631.865C779.566 621.569 761.033 609.582 739.572 595.905L730.195 589.94C706.51 574.9 681.173 559.542 654.184 543.865L281.484 759.025L127.712 670.253L500.422 455.087L1.56408 167.096L42.2741 143.594L42.4686 143.575L1531.37 1.23756L1531.69 1.19264L1531.71 1.20534L1532.88 1.09304L1532.3 1.54809ZM245.094 158.828L629.348 380.658L1173.59 66.4648L245.094 158.828Z";
      case 5:
        return "M1917.88 229.034L1917.45 229.284C1844.82 271.213 1788.76 304.312 1749.26 328.583L1741.92 333.108C1705.49 355.605 1673.54 376.16 1646.07 394.775L1645.52 395.15L1645.08 394.727C1637.47 387.406 1619.67 374.926 1591.64 357.268L1591.64 357.268C1564.88 340.354 1533.04 321.232 1496.09 299.902L1496.07 299.894C1460.4 277.828 1424.73 256.498 1389.05 235.904L1186.86 119.177L796.262 318.27C838.038 326.344 881.69 336.951 927.218 350.093C974.446 362.622 1024.19 383.983 1076.46 414.157C1154.23 459.054 1205.27 503.238 1229.52 546.709C1253.76 590.17 1255.68 631.805 1235.25 671.603L1234.29 673.465C1213.64 712.515 1175.67 747.989 1120.42 779.887C1046.44 822.596 960.968 850.583 864.011 863.84C767.079 877.094 666.327 877.829 561.761 866.05C458.848 855.906 359.643 836.49 264.148 807.804L259.603 806.431C162.709 776.991 76.6487 740.558 1.42492 697.131L0.9919 696.881L36.2621 676.519L36.6951 676.769C92.7104 709.107 157 735.198 229.568 755.042L229.581 755.046L232.925 756.004C303.213 775.987 377.197 787.425 454.884 790.318L454.893 790.319H454.903C533.811 794.727 612.722 788.85 691.644 772.683L695.341 771.916C772.91 755.611 847.419 726.842 918.865 685.597C999.066 639.297 1040.38 591.195 1042.92 541.29V541.279C1048.01 491.384 1011.79 444.031 934.155 399.209C901.051 380.098 869.876 365.777 840.632 356.234L840.621 356.231L840.611 356.227C813.881 346.674 782.051 337.118 745.117 327.56L744.844 327.49L744.773 327.324L737.127 309.668L737.037 309.46L737.316 309.318L1343.21 1.46536L1343.73 1.20268L1344.12 1.52932C1355.57 11.0794 1369.57 21.3682 1386.13 32.395L1386.13 32.3945C1403.96 44.1584 1421.78 55.1865 1439.61 65.4788L1655.59 190.164C1681.7 205.235 1704.76 216.527 1724.78 224.048C1744.8 231.57 1761.72 235.296 1775.55 235.3C1804.67 234.568 1839.59 225.425 1880.33 207.786L1880.76 207.602L1917.88 229.034Z";
      default:
        return "M750,100 L850,100 L850,800 L750,800 L750,100 Z"; // Simple fallback
    }
  };

  // Just render the SVG with the current number - morphing handled in useEffect
  return (
    <div className="w-full h-full">
      <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <g transform={getNumberTransform(number)}>
          <path d={getPathDataForNumber(number)} stroke="var(--dawn)" strokeWidth={strokeWidth} fill="none"/>
        </g>
      </svg>
    </div>
  );
};

export default function AnimatedNumberBackground({ number, strokeWidth, scale }: AnimatedNumberBackgroundProps) {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 pointer-events-none">
      <div className="w-full h-full">
        <AnimatedNumberSVG number={number} strokeWidth={strokeWidth} scale={scale} />
      </div>
    </div>
  );
} 