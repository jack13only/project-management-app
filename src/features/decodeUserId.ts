import jwt_decode from 'jwt-decode';

const decodeUserId = (userToken: string) => {
  try {
    if (userToken) {
      const decoded: { userId: string } = jwt_decode(userToken);
      return decoded.userId;
    }
  } catch (e) {
    console.log('Something go wrong with decoding token', e);
  }
  return '';
};

export default decodeUserId;
