import { supabase } from './supabase';

async function resizeImage(file) {
    const MAX_PX = 1568;
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const scale = Math.min(1, MAX_PX / Math.max(img.width, img.height));
            const w = Math.round(img.width * scale);
            const h = Math.round(img.height * scale);
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            canvas.toBlob(blob => {
                if (blob) resolve(blob);
                else reject(new Error('Image resize failed'));
            }, 'image/jpeg', 0.88);
        };
        img.onerror = () => reject(new Error('Could not load image'));
        img.src = URL.createObjectURL(file);
    });
}

export async function uploadFloorPlan(file) {
    const resized = await resizeImage(file);
    const filename = `${crypto.randomUUID()}.jpg`;
    const { error } = await supabase.storage
        .from('floor-plans')
        .upload(filename, resized, { contentType: 'image/jpeg' });
    if (error) throw new Error(`Upload failed: ${error.message}`);
    const { data } = supabase.storage.from('floor-plans').getPublicUrl(filename);
    return data.publicUrl;
}

export async function analyzeFloorPlan(imageUrl, rectangles, annotatedBase64) {
    const { data, error } = await supabase.functions.invoke('analyze-floor-plan', {
        body: { imageUrl, rectangles, annotatedBase64 },
    });
    if (error) {
        const detail = data?.error || error.message;
        throw new Error(`Analysis failed: ${detail}`);
    }
    if (data?.error) throw new Error(data.error);
    return data;
}
