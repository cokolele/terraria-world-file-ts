#include <stdint.h>
#include <stdlib.h>

uint8_t *global_buffer;
uint32_t global_buffer_size;

void free_global_buffer()
{
    if (global_buffer != NULL)
    {
        free(global_buffer);
        global_buffer = NULL;
        global_buffer_size = 0;
    }
}

void allocate_global_buffer(uint32_t size)
{
    free_global_buffer();

    global_buffer = (uint8_t *) malloc(size);
    global_buffer_size = size;
}

uint32_t process_tiles()
{
    return global_buffer_size;
}
