import { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';

// Two identically-framed photos stacked. The top one is clipped to a soft
// circle that follows the cursor, so only the area under the pointer swaps —
// hover the eyes and the glasses come off, the rest of the frame is untouched.
// Forwards its node so ConnectorStreams can measure where the photo sits.
const PhotoReveal = forwardRef(({ base, reveal, alt, className = '' }, forwardedRef) => {
    const ref = useRef(null);
    const raf = useRef(0);

    useImperativeHandle(forwardedRef, () => ref.current, []);

    // Position is written straight to the node as CSS custom properties.
    // Routing it through React state would re-render on every mouse move.
    const track = useCallback((e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        if (raf.current) return;
        raf.current = requestAnimationFrame(() => {
            el.style.setProperty('--mx', `${x}px`);
            el.style.setProperty('--my', `${y}px`);
            raf.current = 0;
        });
    }, []);

    const activate = useCallback((e) => {
        track(e);
        ref.current?.classList.add('is-revealing');
    }, [track]);

    const deactivate = useCallback(() => {
        if (raf.current) {
            cancelAnimationFrame(raf.current);
            raf.current = 0;
        }
        ref.current?.classList.remove('is-revealing');
    }, []);

    return (
        <div
            ref={ref}
            className={`photo-reveal ${className}`}
            onPointerEnter={activate}
            onPointerMove={track}
            onPointerLeave={deactivate}
            onPointerCancel={deactivate}
        >
            <img src={base} alt={alt} className="photo-reveal__img" />
            {/* Decorative: it shows the same person, already described by the base image. */}
            <img src={reveal} alt="" aria-hidden="true" className="photo-reveal__img photo-reveal__lens" />
            <span className="photo-reveal__ring" aria-hidden="true" />
        </div>
    );
});

PhotoReveal.displayName = 'PhotoReveal';

export default PhotoReveal;
