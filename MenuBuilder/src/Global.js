//
// These are Global Variable and accessible throught application
const AXIOS_INSTANCE =
    axios && axios.create ? axios.create({}) : axios.default.create({});

export { AXIOS_INSTANCE };
