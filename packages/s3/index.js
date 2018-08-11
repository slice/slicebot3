require('@babel/register')({
  plugins: ['@babel/plugin-transform-modules-commonjs'],
})

require('./src')
