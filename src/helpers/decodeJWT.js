export default function decodeJWT(token) {
    const KEY = EnvironmentModule.get(`KEY`);

    return new Promise((resolve) => {
        jwt.verify(token, KEY, (err, data) => {
            if (err) resolve(null);
            resolve(data);
        });
    });
}
