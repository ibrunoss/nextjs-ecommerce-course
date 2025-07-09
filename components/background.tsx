export const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden pointer-events-none">
      <div className="relative flex">
        {Array.from({ length: 40 }).map((_, index) => {
          const isEven = index % 2 === 0;
          const animationDuration = `calc(15s / ${
            Math.floor(Math.random() * (30 - 10 + 1)) + 10
          })`;
          const animationDelay = `${Math.random() * 15}s`;
          const initialY = Math.random() * 100;
          const color = isEven ? "bg-[#4fc3dc]" : "bg-[#ff2d75]";
          const shadow = isEven
            ? "shadow-[0_0_0_10px_rgba(79,195,220,0.27),0_0_50px_#4fc3dc,0_0_100px_#4fc3dc]"
            : "shadow-[0_0_0_10px_rgba(255,45,117,0.27),0_0_50px_#ff2d75,0_0_100px_#ff2d75]";
          const bubbleKey = `${color}-${shadow}-${animationDuration}-${animationDelay}-${initialY}`;

          return (
            <span
              key={bubbleKey}
              style={{
                animationDuration,
                animationDelay,
                transform: `translateY(${100 - initialY}dvh) scale(0)`,
              }}
              className={`bubble relative w-[30px] h-[30px] rounded-full m-[0_4px] ${color} ${shadow}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
};
