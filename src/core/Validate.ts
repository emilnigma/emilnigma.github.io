import SHA256 from 'crypto-js/sha256';

export default (text: string, label: keyof typeof solutions): boolean => {
    const enc = SHA256(text).toString()
    console.log(enc)
    return solutions[label].includes(enc)
}

const solutions = {
    chemist: [
        "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"
    ],
}