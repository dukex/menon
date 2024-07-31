import csv
from dagster import asset, op, AutoMaterializeRule, AutoMaterializePolicy


@op()
def course_should_be_updated(course):
    return True


@asset()
def courses():
    with open("courses.csv") as file:
        return [course for course in csv.DictReader(file, delimiter=",")]


@asset(
    auto_materialize_policy=AutoMaterializePolicy.eager().with_rules(
        AutoMaterializeRule.materialize_on_parent_updated(),
    ),
)
def courses_to_be_updated(courses):
    return [course for course in courses if course_should_be_updated(course)]
