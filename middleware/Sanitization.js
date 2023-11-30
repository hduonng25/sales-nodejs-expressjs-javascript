import sanitize from "mongo-sanitize";

export default function validate_api(request, _, next) {
  const checkSpecialCharacter = (object) => {
    const clone = JSON.parse(JSON.stringify(object));
    const cleaned = sanitize(object);
    return JSON.stringify(clone) !== JSON.stringify(cleaned);
  };
  const statuses = [
    checkSpecialCharacter(request.body),
    checkSpecialCharacter(request.params),
    checkSpecialCharacter(request.query),
  ];
  if (statuses.some((v) => v === true)) {
    next({
      statusCode: 400,
      error: "DATA_INVALID",
      description: "Data input is not valid",
    });
  }
  next();
}
