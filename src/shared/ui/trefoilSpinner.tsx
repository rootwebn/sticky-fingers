import React from 'react';

interface TrefoilSpinnerProps {
  size?: number; // Size of the SVG (both width and height)
  speed?: number; // Speed of the animation
  stroke?: string; // Stroke color for the paths
  strokeLength?: number; // Length of the stroke dasharray
}

const TrefoilSpinner: React.FC<TrefoilSpinnerProps> = ({
  size = 40,
  speed = 1.4,
  stroke = 'black',
  strokeLength = 15,
}) => {
  return (
    <svg
      className="overflow-visible transform origin-center"
      x="0px"
      y="0px"
      viewBox="0 0 40 40"
      height={size}
      width={size}
    >
      <path
        className="transition-stroke ease-linear duration-500"
        fill="none"
        strokeWidth="4"
        pathLength="100"
        d="M29.760000000000005 18.72 c0 7.28 -3.9200000000000004 13.600000000000001 -9.840000000000002 16.96 c -2.8800000000000003 1.6800000000000002 -6.24 2.64 -9.840000000000002 2.64 c -3.6 0 -6.88 -0.96 -9.76 -2.64 c0 -7.28 3.9200000000000004 -13.52 9.840000000000002 -16.96 c2.8800000000000003 -1.6800000000000002 6.24 -2.64 9.76 -2.64 S26.880000000000003 17.040000000000003 29.760000000000005 18.72 c5.84 3.3600000000000003 9.76 9.68 9.840000000000002 16.96 c -2.8800000000000003 1.6800000000000002 -6.24 2.64 -9.76 2.64 c -3.6 0 -6.88 -0.96 -9.840000000000002 -2.64 c -5.84 -3.3600000000000003 -9.76 -9.68 -9.76 -16.96 c0 -7.28 3.9200000000000004 -13.600000000000001 9.76 -16.96 C25.84 5.120000000000001 29.760000000000005 11.440000000000001 29.760000000000005 18.72z"
        style={{ stroke: stroke, opacity: 0.1 }}
      ></path>
      <path
        className="transition-stroke ease-linear duration-500"
        fill="none"
        strokeWidth="4"
        pathLength="100"
        d="M29.760000000000005 18.72 c0 7.28 -3.9200000000000004 13.600000000000001 -9.840000000000002 16.96 c -2.8800000000000003 1.6800000000000002 -6.24 2.64 -9.840000000000002 2.64 c -3.6 0 -6.88 -0.96 -9.76 -2.64 c0 -7.28 3.9200000000000004 -13.52 9.840000000000002 -16.96 c2.8800000000000003 -1.6800000000000002 6.24 -2.64 9.76 -2.64 S26.880000000000003 17.040000000000003 29.760000000000005 18.72 c5.84 3.3600000000000003 9.76 9.68 9.840000000000002 16.96 c -2.8800000000000003 1.6800000000000002 -6.24 2.64 -9.76 2.64 c -3.6 0 -6.88 -0.96 -9.840000000000002 -2.64 c -5.84 -3.3600000000000003 -9.76 -9.68 -9.76 -16.96 c0 -7.28 3.9200000000000004 -13.600000000000001 9.76 -16.96 C25.84 5.120000000000001 29.760000000000005 11.440000000000001 29.760000000000005 18.72z"
        style={{
          stroke: stroke,
          strokeDasharray: `${strokeLength}, ${100 - strokeLength}`,
          animation: `travel ${speed}s linear infinite`,
        }}
      ></path>
      <style>
        {`
          @keyframes travel {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -100;
            }
          }
        `}
      </style>
    </svg>
  );
};

export default TrefoilSpinner;
