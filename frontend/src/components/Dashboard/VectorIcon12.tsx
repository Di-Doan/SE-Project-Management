import { memo, SVGProps } from 'react';

const VectorIcon12 = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 5 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M2.49219 3.76953C2.83174 3.76953 3.16366 3.66884 3.44599 3.4802C3.72832 3.29156 3.94836 3.02343 4.0783 2.70973C4.20824 2.39602 4.24224 2.05083 4.176 1.7178C4.10975 1.38478 3.94625 1.07887 3.70615 0.838776C3.46605 0.598678 3.16014 0.435169 2.82712 0.368926C2.49409 0.302683 2.1489 0.336681 1.8352 0.466622C1.5215 0.596562 1.25337 0.816608 1.06472 1.09893C0.87608 1.38126 0.775392 1.71318 0.775392 2.05274C0.775392 2.50806 0.956268 2.94473 1.27823 3.26669C1.60019 3.58866 2.03687 3.76953 2.49219 3.76953ZM2.49219 12.3535C2.15264 12.3535 1.82071 12.4542 1.53839 12.6428C1.25606 12.8315 1.03602 13.0996 0.906075 13.4133C0.776134 13.727 0.742136 14.0722 0.808379 14.4052C0.874622 14.7383 1.03813 15.0442 1.27823 15.2843C1.51833 15.5244 1.82423 15.6879 2.15726 15.7541C2.49028 15.8204 2.83547 15.7864 3.14918 15.6564C3.46288 15.5265 3.73101 15.3064 3.91965 15.0241C4.1083 14.7418 4.20899 14.4099 4.20899 14.0703C4.20899 13.615 4.02811 13.1783 3.70615 12.8564C3.38419 12.5344 2.94751 12.3535 2.49219 12.3535ZM2.49219 6.34473C2.15264 6.34473 1.82071 6.44542 1.53839 6.63406C1.25606 6.8227 1.03602 7.09083 0.906075 7.40453C0.776134 7.71824 0.742136 8.06343 0.808379 8.39645C0.874622 8.72948 1.03813 9.03538 1.27823 9.27548C1.51833 9.51558 1.82423 9.67909 2.15726 9.74533C2.49028 9.81158 2.83547 9.77758 3.14918 9.64764C3.46288 9.5177 3.73101 9.29765 3.91965 9.01533C4.1083 8.733 4.20899 8.40107 4.20899 8.06152C4.20899 7.6062 4.02811 7.16953 3.70615 6.84757C3.38419 6.5256 2.94751 6.34473 2.49219 6.34473Z'
      fill='#646C78'
    />
  </svg>
);

const Memo = memo(VectorIcon12);
export { Memo as VectorIcon12 };
