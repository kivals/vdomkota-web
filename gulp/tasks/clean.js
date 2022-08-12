import del from 'del';

const clean = () => {
  return del(app.path.clean);
}

export {
  clean
}