
export function uuid(): string
{
    let guid: string = "";

    for (let i = 0; i < 32; i++)
    {
        if (i == 8 || i == 12 || i == 16 || i == 20)
        {
            guid += '-';
        }
        guid += Math.floor(Math.random() * 16).toString(16).toUpperCase();
    }

    return guid;
}