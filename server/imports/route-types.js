export const PostRoute = Picker.filter((req, res) => (req.method === 'POST'));
export const GetRoute = Picker.filter((req, res) => (req.method === 'GET'));
