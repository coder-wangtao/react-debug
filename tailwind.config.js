// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 根据你的项目文件结构进行调整
  ],
  theme: {
    extend: {
      padding: {
        1: "30px",
      },
    },
  },
  plugins: [],
};
