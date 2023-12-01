import { memo, SVGProps } from 'react';

const VectorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 16 18' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M14.5929 5.18613L9.44247 0.657685C8.97033 0.234151 8.35911 0 7.72567 0C7.09223 0 6.48101 0.234151 6.00887 0.657685L0.85848 5.18613C0.585825 5.43069 0.368249 5.73071 0.220236 6.0662C0.0722244 6.40169 -0.00282633 6.76495 8.13711e-05 7.13181V14.6563C8.13711e-05 15.3412 0.271396 15.9982 0.754339 16.4825C1.23728 16.9669 1.89229 17.239 2.57528 17.239H12.8761C13.559 17.239 14.2141 16.9669 14.697 16.4825C15.1799 15.9982 15.4513 15.3412 15.4513 14.6563V7.1232C15.4529 6.75779 15.3773 6.39619 15.2293 6.06227C15.0814 5.72835 14.8644 5.42973 14.5929 5.18613V5.18613ZM9.44247 15.5172H6.00887V11.2126C6.00887 10.9842 6.09931 10.7653 6.26029 10.6038C6.42127 10.4424 6.63961 10.3516 6.86727 10.3516H8.58407C8.81173 10.3516 9.03006 10.4424 9.19105 10.6038C9.35203 10.7653 9.44247 10.9842 9.44247 11.2126V15.5172ZM13.7345 14.6563C13.7345 14.8846 13.644 15.1036 13.483 15.265C13.3221 15.4265 13.1037 15.5172 12.8761 15.5172H11.1593V11.2126C11.1593 10.5276 10.8879 9.87064 10.405 9.38628C9.92206 8.90192 9.26705 8.62981 8.58407 8.62981H6.86727C6.18429 8.62981 5.52927 8.90192 5.04633 9.38628C4.56339 9.87064 4.29207 10.5276 4.29207 11.2126V15.5172H2.57528C2.34762 15.5172 2.12928 15.4265 1.9683 15.265C1.80732 15.1036 1.71688 14.8846 1.71688 14.6563V7.1232C1.71703 7.00096 1.74314 6.88016 1.79346 6.76883C1.84379 6.65749 1.91717 6.55818 2.00873 6.47751L7.15913 1.95767C7.31577 1.81965 7.51716 1.74353 7.72567 1.74353C7.93418 1.74353 8.13556 1.81965 8.29221 1.95767L13.4426 6.47751C13.5342 6.55818 13.6076 6.65749 13.6579 6.76883C13.7082 6.88016 13.7343 7.00096 13.7345 7.1232V14.6563Z'
      fill='white'
    />
  </svg>
);

const Memo = memo(VectorIcon);
export { Memo as VectorIcon };
