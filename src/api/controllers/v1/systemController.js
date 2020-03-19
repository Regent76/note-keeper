function getSwaggerFile(req, res) {
  res.sendFile("swagger.yml", { root: __dirname + "../../../../" });
}

export { getSwaggerFile };
