export default (res, e) => {
  console.log({Erroe: e.message})
  return res.status(500).json({
    error: "Что то пошло не так, попробуйте снова, " + e.message
  })
}