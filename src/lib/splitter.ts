import JSZip from 'jszip';

export type SplitMode = '2x2' | '1x4';

interface SplitResult {
    blob: Blob;
    filename: string;
}

export async function splitImage(
    imageElement: HTMLImageElement,
    mode: SplitMode
): Promise<SplitResult[]> {
    const results: SplitResult[] = [];
    const { width, height } = imageElement;

    if (mode === '2x2') {
        // 2x2 grid split
        const halfW = Math.floor(width / 2);
        const halfH = Math.floor(height / 2);

        const positions = [
            { x: 0, y: 0, w: halfW, h: halfH, name: '1_top_left.jpg' },
            { x: halfW, y: 0, w: width - halfW, h: halfH, name: '2_top_right.jpg' },
            { x: 0, y: halfH, w: halfW, h: height - halfH, name: '3_bottom_left.jpg' },
            { x: halfW, y: halfH, w: width - halfW, h: height - halfH, name: '4_bottom_right.jpg' },
        ];

        for (const pos of positions) {
            const canvas = document.createElement('canvas');
            canvas.width = pos.w;
            canvas.height = pos.h;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(imageElement, pos.x, pos.y, pos.w, pos.h, 0, 0, pos.w, pos.h);
            const blob = await new Promise<Blob>((resolve) => {
                canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.92);
            });
            results.push({ blob, filename: pos.name });
        }
    } else {
        // 1x4 vertical split
        const quarterH = Math.floor(height / 4);

        const positions = [
            { y: 0, h: quarterH, name: '1_top.jpg' },
            { y: quarterH, h: quarterH, name: '2_upper_middle.jpg' },
            { y: quarterH * 2, h: quarterH, name: '3_lower_middle.jpg' },
            { y: quarterH * 3, h: height - quarterH * 3, name: '4_bottom.jpg' },
        ];

        for (const pos of positions) {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = pos.h;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(imageElement, 0, pos.y, width, pos.h, 0, 0, width, pos.h);
            const blob = await new Promise<Blob>((resolve) => {
                canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.92);
            });
            results.push({ blob, filename: pos.name });
        }
    }

    return results;
}

export async function createZip(results: SplitResult[]): Promise<Blob> {
    const zip = new JSZip();

    for (const result of results) {
        zip.file(result.filename, result.blob);
    }

    return await zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
