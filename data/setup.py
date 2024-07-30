from setuptools import find_packages, setup

setup(
    name="data",
    packages=find_packages(exclude=["data_tests"]),
    install_requires=[
        "python-youtube",
        "dagster"
    ],
    extras_require={"dev": ["dagster-webserver", "pytest"]},
)
