export const isValidEmail = (email) => {
  // eslint-disable-next-line
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const getToken = () => {
  return localStorage.getItem("auth-token");
};

export const catchErrors = (error) => {
  const { response } = error;
  if (response?.data) return response.data;

  return { error: error.message || error };
};

export const renderItem = (result) => {
  return (
    <div key={result.id} className="flex space-x-2 rounded overflow-hidden">
      <img
        src={result.avatar}
        alt={result.name}
        className="w-16 h-16 object-cover"
      />
      <p className="dark:text-white font-semibold">{result.name}</p>
    </div>
  );
};

export const getPoster = (posters=[]) => {
  const {length} = posters
  if(!length) return null;
  if(length>2) return posters[1];
  return posters[0];
};

export const convertReviewCount = (reviewCount) => {
  if (!reviewCount) return 0;
  if (reviewCount <= 999) return reviewCount;
  return parseFloat(reviewCount / 1000).toFixed(2) + "k";
};

