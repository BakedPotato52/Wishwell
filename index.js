const generateAlphanumericId = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result);
};

generateAlphanumericId(20);
generateAlphanumericId(20);
generateAlphanumericId(20);
generateAlphanumericId(20);
generateAlphanumericId(20);
generateAlphanumericId(20);
generateAlphanumericId(20);
generateAlphanumericId(20);
generateAlphanumericId(20);
generateAlphanumericId(20);
