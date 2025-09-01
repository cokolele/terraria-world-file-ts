emcc main.c \
    -O3 \
    -s WASM=1 \
    -s MODULARIZE=1 \
    -s ENVIRONMENT=web,node \
    -o dist/wasm.js