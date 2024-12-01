const NotFoundPage = ({ movieData }) => {
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <div>
      <img
        src={
          movieData?.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
            : defaultImg
        }
        width={250}
        alt="Movie poster"
      />
    </div>
  );
};

export default NotFoundPage;