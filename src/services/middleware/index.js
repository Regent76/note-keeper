import expressCors from "cors";

function cors(options = {}) {
  const fullOptions = Object.assign(options, { optionsSuccessStatus: 200 });
  return expressCors(fullOptions);
}

export { cors };
