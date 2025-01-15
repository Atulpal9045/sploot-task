module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/server',
        destination: '/api/server',
      },
    ];
  },
};
