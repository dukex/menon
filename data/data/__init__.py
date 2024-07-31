from dagster import (
    Definitions,
    define_asset_job,
    load_assets_from_modules,
    sensor,
    RunRequest,
)
import os

from .assets import courses
from .assets import enrichment_courses
from .assets import save_courses
from .assets import enrichment_lessons
from .assets import save_lessons

all_assets = load_assets_from_modules([
    courses,
    enrichment_courses,
    save_courses,
    enrichment_lessons,
    save_lessons,
])
courses_job = define_asset_job(name="courses_job", selection="courses")


@sensor(job=courses_job)
def sensor_courses_csv(context):
    last_mtime = float(context.cursor) if context.cursor else 0

    max_mtime = last_mtime
    filepath = os.path.join("courses.csv")
    fstats = os.stat(filepath)

    file_mtime = fstats.st_mtime
    if file_mtime <= last_mtime:
        return

    run_key = f"{filepath}:{file_mtime}"
    yield RunRequest(run_key=run_key)
    max_mtime = max(max_mtime, file_mtime)

    context.update_cursor(str(max_mtime))


defs = Definitions(assets=all_assets, jobs=[courses_job], sensors=[sensor_courses_csv])
